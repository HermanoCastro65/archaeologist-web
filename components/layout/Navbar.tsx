export default function Navbar() {
  return (
    <header className="border-b border-border bg-panel">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 font-semibold text-matrix">Archaeologist</div>

        <nav className="flex gap-6 text-sm text-graySoft">
          <a href="/" className="hover:text-white">
            Home
          </a>
          <a href="/dashboard" className="hover:text-white">
            Dashboard
          </a>
          <a href="#" className="hover:text-white">
            Repositories
          </a>
        </nav>
      </div>
    </header>
  )
}
