import { getAllUsers } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers() {

  return useQuery({
    queryKey: ['getAllUsers'],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5  // 5 minutos em cache
  })
}