type Props = {
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 bg-panel border border-border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  )
}
