export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/api/repositories/:path*', '/dashboard/:path*'],
}
