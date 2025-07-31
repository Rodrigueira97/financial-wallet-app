"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"
import { useGetAllUsers } from "@/hooks/useGetAllUsers"
import { Skeleton } from "@/components/ui/skeleton"


interface UsersListProps {

  onTransfer: (userId: string) => void
}

export function UsersList({ onTransfer }: UsersListProps) {
  const { data, isLoading } = useGetAllUsers()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Usuários da Plataforma
        </CardTitle>
        <CardDescription>Lista de usuários para transferências</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          data?.users?.length ? (
            <div className="space-y-3">
              {data.users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onTransfer(user.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 opacity-70">
              <Users className="w-12 h-12 mb-2" />
              <p className="text-lg font-medium">Nenhum usuário encontrado</p>
              <p className="text-sm text-gray-500">Convide alguém para usar a plataforma!</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  )
}
