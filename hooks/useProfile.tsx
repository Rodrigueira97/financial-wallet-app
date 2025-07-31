import { userProfile } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: userProfile,
    staleTime: 1000 * 60 * 5  // 5 minutos em cache
  })
}