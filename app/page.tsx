import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-matrix">Archaeologist Web</h1>

        <p className="text-graySoft max-w-xl text-lg">
          Analyze, scan and index Git repositories automatically.
        </p>
      </div>

      <Link
        href="/dashboard"
        className="inline-block bg-gradient-to-r from-green-500 to-emerald-400 text-black px-6 py-3 rounded font-semibold hover:opacity-90"
      >
        Open Dashboard
      </Link>
    </div>
  )
}
