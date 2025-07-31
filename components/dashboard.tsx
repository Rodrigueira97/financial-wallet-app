"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BalanceCard } from "@/components/balance-card"
import { DepositModal } from "@/components/deposit-modal"
import { TransferModal } from "@/components/transfer-modal"
import { UsersList } from "@/components/users-list"
import { LogOut, Plus, Send } from "lucide-react"
import { useProfile } from "@/hooks/useProfile"
import { Loading } from "./loading"
import { UserDTO } from "@/dto/user.dto"
import { useRouter, useSearchParams } from "next/navigation"

interface DashboardProps {
  user: UserDTO
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)

  const { data, isLoading } = useProfile()

  function handleTranfer(recipientId: string) {
    if (recipientId) {
      params.set('selectedUser', recipientId)
    } else {
      params.delete('selectedUser')
    }
    router.replace(`?${params.toString()}`)

    setShowTransferModal(true)
  }

  function handleCloseTransferModal() {
    params.delete('selectedUser')
    router.replace(`?${params.toString()}`)

    setShowTransferModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FinancialWallet
              </h1>
              <p className="text-gray-600">Olá, {data?.name || user?.name}!</p>
            </div>
            <Button onClick={onLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <BalanceCard balance={data?.balance || user.balance} />

              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>Gerencie sua carteira</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setShowDepositModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Depositar
                  </Button>
                  <Button
                    onClick={() => setShowTransferModal(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Transferir
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <UsersList
                onTransfer={handleTranfer}
              />
            </div>
          </div>

          <DepositModal
            isOpen={showDepositModal}
            onClose={() => setShowDepositModal(false)}
          />

          <TransferModal
            isOpen={showTransferModal}
            onClose={handleCloseTransferModal}
            currentBalance={data?.balance || user?.balance}
          />
        </div>
      )}
    </div>
  )
}
