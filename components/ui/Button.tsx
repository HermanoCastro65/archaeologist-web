import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, variant = 'primary', className, ...props }: Props) {
  const variants = {
    primary: 'bg-matrixSoft text-black hover:bg-matrix shadow-[0_0_12px_rgba(0,255,156,0.3)]',
    secondary: 'bg-panel text-white border border-border hover:border-matrix',
    ghost: 'bg-transparent text-graySoft hover:text-white',
  }

  return (
    <button
      {...props}
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-all duration-200 active:scale-95',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  )
}
