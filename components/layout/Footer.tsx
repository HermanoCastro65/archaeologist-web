export default function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between text-sm text-graySoft">
        <span>© {new Date().getFullYear()} Archaeologist Web</span>

        <span className="text-matrix">Code Intelligence Engine</span>
      </div>
    </footer>
  )
}
