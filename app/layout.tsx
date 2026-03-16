import './globals.css'
import Navbar from '@/components/layout/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  )
}
