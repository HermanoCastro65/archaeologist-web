import { cn } from '@/lib/utils'

type Props = {
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-4 py-2 rounded-md bg-panel border border-border text-white',
        'placeholder:text-graySoft',
        'focus:outline-none focus:ring-2 focus:ring-matrixSoft focus:border-matrix',
        'transition-all duration-200',
        className
      )}
    />
  )
}
