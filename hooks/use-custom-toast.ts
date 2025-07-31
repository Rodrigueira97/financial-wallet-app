"use client"

import { useToast } from "@/hooks/use-toast"

export function useCustomToast() {
  const { toast } = useToast()

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      className: "border-green-200 bg-green-50 text-green-800",
    })
  }

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    })
  }

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      className: "border-yellow-200 bg-yellow-50 text-yellow-800",
    })
  }

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      className: "border-blue-200 bg-blue-50 text-blue-800",
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    toast,
  }
} 