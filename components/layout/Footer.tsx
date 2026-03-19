export default function Footer() {
  return (
    <footer className="border-t border-border mt-12 bg-panel/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-graySoft">
        <span>© {new Date().getFullYear()} Archaeologist Web</span>

        <span className="text-matrixSoft font-medium tracking-wide">Code Intelligence Engine</span>
      </div>
    </footer>
  )
}
