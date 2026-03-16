import './globals.css'
import Navbar from '@/components/layout/Navbar'
import AuthProvider from '@/components/layout/SessionProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white">
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
