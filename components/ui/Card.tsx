import { cn } from '@/lib/utils'

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'bg-panel border border-border rounded-xl p-6 transition-all duration-300',
        'hover:border-matrix hover:shadow-[0_0_20px_rgba(0,255,156,0.08)]',
        className
      )}
    >
      {children}
    </div>
  )
}
