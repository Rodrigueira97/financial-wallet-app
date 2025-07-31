import { twMerge } from "tailwind-merge"

interface LoadingProps {
  title?: string
  minHeight?: boolean;
  height?: string;
}

export function Loading({ title = "Carregando...", minHeight, height }: LoadingProps) {

  return (
    <div className={twMerge("min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center", minHeight && 'min-h-full', height)}>
      <div className="text-center">

        <div className={"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        }></div>

        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  )
}