"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white text-gray-900",
        success: "border-green-200 bg-green-50 text-green-800",
        error: "border-red-200 bg-red-50 text-red-800",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
        info: "border-blue-200 bg-blue-50 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CustomToastProps extends VariantProps<typeof toastVariants> {
  title: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  className?: string
}

const getIcon = (variant: string) => {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case "error":
      return <XCircle className="h-5 w-5 text-red-600" />
    case "warning":
      return <AlertCircle className="h-5 w-5 text-yellow-600" />
    case "info":
      return <Info className="h-5 w-5 text-blue-600" />
    default:
      return <Info className="h-5 w-5 text-gray-600" />
  }
}

export function CustomToast({ 
  title, 
  description, 
  variant = "default", 
  className 
}: CustomToastProps) {
  return (
    <div className={cn(toastVariants({ variant }), className)}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon(variant)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
} 