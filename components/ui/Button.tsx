type Props = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-matrixSoft text-black font-semibold rounded hover:bg-matrix transition"
    >
      {children}
    </button>
  )
}
