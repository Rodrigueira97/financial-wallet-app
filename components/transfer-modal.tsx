"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useGetAllUsers } from "@/hooks/useGetAllUsers"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { transfer } from "@/api/wallet.api"
import { UserDTO } from "@/dto/user.dto"
import { useCustomToast } from "@/hooks/use-custom-toast"

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
  currentBalance: number

}

export function TransferModal({ isOpen, onClose, currentBalance }: TransferModalProps) {

  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedUser = searchParams.get('selectedUser') || ""
  const { showSuccess, showError, showWarning } = useCustomToast()

  const [amount, setAmount] = useState("")

  const { data } = useGetAllUsers()

  const queryClient = useQueryClient()

  const mutationTransfer = useMutation({
    mutationFn: transfer,
    onSuccess: () => {
      const params = new URLSearchParams(searchParams)
      params.delete('selectedUser')
      router.replace(`?${params.toString()}`)

      setAmount("")
      onClose()

      showSuccess(
        "Transferência realizada com sucesso!",
        `R$ ${Number.parseFloat(amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} foi transferido.`
      )

      queryClient.setQueryData(['user-profile'], (prevData: UserDTO) => {
        if (prevData) {
          const currentBalance = Number(prevData.balance)
          const transferAmount = Number.parseFloat(amount)
          const newBalance = currentBalance - transferAmount

          return {
            ...prevData,
            balance: newBalance
          }
        }
        return prevData
      })

    },
    onError: () => {
      showError(
        "Erro na transferência",
        "Ocorreu um erro ao processar a transferência. Tente novamente mais tarde."
      )
    }
  })

  const handleTransfer = () => {
    const transferAmount = Number.parseFloat(amount)

    if (selectedUser && transferAmount > 0 && transferAmount <= currentBalance) {
      mutationTransfer.mutate({
        toUserId: selectedUser,
        amount: transferAmount
      })

    } else {
      showWarning(
        "Saldo insuficiente",
        "Você não possui saldo suficiente para realizar esta transferência."
      )
    }
  }

  const handleUserSelect = (userId: string) => {
    const params = new URLSearchParams(searchParams)
    if (userId) {
      params.set('selectedUser', userId)
    } else {
      params.delete('selectedUser')
    }
    router.replace(`?${params.toString()}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transferir Dinheiro</DialogTitle>
          <DialogDescription>Envie dinheiro para outro usuário da plataforma</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Destinatário</Label>

            <Select value={selectedUser} onValueChange={handleUserSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>

              <SelectContent>
                {data?.users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-amount">Valor da Transferência</Label>

            <Input
              id="transfer-amount"
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              max={currentBalance}
              step="0.01"
            />
            <p className="text-sm text-gray-600">
              Saldo disponível: R$ {currentBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>

            <Button
              onClick={handleTransfer}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={
                !selectedUser || !amount || Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > currentBalance || mutationTransfer.isPending
              }
            >
              {mutationTransfer.isPending ? 'Transferindo...' : 'Transferir'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
