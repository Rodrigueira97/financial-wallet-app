"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deposit } from "@/api/wallet.api"
import { UserDTO } from "@/dto/user.dto"
import { useCustomToast } from "@/hooks/use-custom-toast"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const { showSuccess, showError } = useCustomToast()

  const queryClient = useQueryClient()

  const { mutate: depositMutation, isPending } = useMutation({
    mutationFn: deposit,
    onSuccess: (data: any) => {
      if (data && data.amount) {
        queryClient.setQueryData(['user-profile'], (prevData: UserDTO) => {
          if (prevData) {
            const currentBalance = Number(prevData.balance)
            const depositAmount = Number(data.amount)
            const newBalance = currentBalance + depositAmount

            return {
              ...prevData,
              balance: newBalance
            }
          }
          return prevData
        })
      }

      setAmount("")
      onClose()
      
      showSuccess(
        "Depósito realizado com sucesso!",
        `R$ ${Number.parseFloat(amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} foi adicionado à sua carteira.`
      )
    },
    onError: () => {
      showError(
        "Erro no depósito",
        "Ocorreu um erro ao processar o depósito. Tente novamente mais tarde."
      )
    }
  })

  function handleDeposit() {
    const depositAmount = Number.parseFloat(amount)

    if (depositAmount > 0) {
      depositMutation(depositAmount)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Depositar Dinheiro</DialogTitle>
          <DialogDescription>Adicione dinheiro à sua carteira digital</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Depósito</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={handleDeposit}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!amount || Number.parseFloat(amount) <= 0 || isPending}
            >
              {isPending ? "Depositando..." : "Depositar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
