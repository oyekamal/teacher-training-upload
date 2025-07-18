import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import useFetchData from './useFetchData'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useFetchData', () => {
  it('fetches data successfully', async () => {
    const fetcher = vi.fn().mockResolvedValue('test data')
    const { result } = renderHook(() => useFetchData('test', fetcher), {
      wrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBe('test data')
  })
})
