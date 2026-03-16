import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/layout/SessionProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />

          <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
