'use client'

import { ReactNode } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToasterTopCenter } from '@/components/ui/toaster-top-center'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToasterTopCenter />
    </QueryClientProvider>
  )
}
