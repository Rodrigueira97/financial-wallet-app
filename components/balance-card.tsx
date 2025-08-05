import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { useProfile } from "@/hooks/useProfile"

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const { isLoading } = useProfile()

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">Saldo Disponível</CardTitle>
        <Wallet className="h-4 w-4 opacity-90" />
      </CardHeader>
      <CardContent>

        {
          isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <div className="text-3xl font-bold">R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          )}

        <p className="text-xs opacity-90 mt-1">Carteira Digital FinancialWallet</p>
      </CardContent>
    </Card>
  )
}
