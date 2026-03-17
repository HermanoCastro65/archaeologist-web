import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuthProvider from '@/components/layout/SessionProvider'
import Sidebar from '@/components/sidebar/Sidebar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />

          <Sidebar />

          <main className="flex-1 ml-[260px] px-6 py-10 max-w-6xl">{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
