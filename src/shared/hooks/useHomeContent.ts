import { useQuery } from '@tanstack/react-query'
import { getHomeContent } from '@/services/homeContent'

export function useHomeContent() {
  return useQuery({
    queryKey: ['home-content'],
    queryFn: getHomeContent,
    staleTime: 5 * 60 * 1000,
  })
}