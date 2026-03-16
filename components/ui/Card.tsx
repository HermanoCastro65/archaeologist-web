export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-panel border border-border rounded-lg p-6 hover:border-matrix transition">
      {children}
    </div>
  )
}
