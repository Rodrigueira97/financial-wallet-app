import { WalletTransferDTO } from "@/dto/user.dto"
import api from "@/services/axios"

export async function deposit(amount: number) {
  const { data } = await api.post('/wallet/deposit', {
    amount
  })

  return data
}

export async function transfer({ toUserId, amount }: WalletTransferDTO) {
  const { data } = await api.post('/wallet/transfer', {
    toUserId,
    amount
  })

  return data
}
