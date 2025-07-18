import { useQuery } from '@tanstack/react-query'

const useFetchData = <T>(queryKey: string, fetcher: () => Promise<T>) => {
  return useQuery<T>({ queryKey: [queryKey], queryFn: fetcher })
}

export default useFetchData
