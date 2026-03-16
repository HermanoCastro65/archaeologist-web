export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-matrix">Archaeologist</h1>

      <p className="text-graySoft max-w-xl">Analyze and index Git repositories automatically.</p>

      <a
        href="/dashboard"
        className="inline-block bg-purple px-6 py-3 rounded font-semibold hover:bg-matrixSoft"
      >
        Open Dashboard
      </a>
    </div>
  )
}
