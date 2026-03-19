import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="text-white">Archaeologist</span> <span className="text-matrix">Web</span>
        </h1>

        <p className="text-graySoft text-lg md:text-xl">
          Analyze, scan and index Git repositories with precision.
          <br />
          Transform codebases into structured insights.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-matrix text-black font-semibold hover:bg-matrixSoft transition shadow-lg shadow-matrix/20"
          >
            Start Scanning
          </Link>

          <Link
            href="/repositories"
            className="px-6 py-3 rounded-lg border border-border text-white hover:border-matrix hover:text-matrix transition"
          >
            View Repositories
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-panel border border-border rounded-lg p-6 hover:border-matrix transition">
          <h3 className="text-matrix font-semibold mb-2">Smart Scanning</h3>
          <p className="text-graySoft text-sm">
            Automatically clone and analyze repository structures.
          </p>
        </div>

        <div className="bg-panel border border-border rounded-lg p-6 hover:border-matrix transition">
          <h3 className="text-matrix font-semibold mb-2">Indexed Files</h3>
          <p className="text-graySoft text-sm">Organize and store repository data efficiently.</p>
        </div>

        <div className="bg-panel border border-border rounded-lg p-6 hover:border-matrix transition">
          <h3 className="text-matrix font-semibold mb-2">Persistent History</h3>
          <p className="text-graySoft text-sm">Access all scanned repositories anytime.</p>
        </div>
      </div>
    </div>
  )
}
