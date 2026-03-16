import { withAuth } from 'next-auth/middleware'

export default withAuth(function proxy() {}, {
  secret: process.env.NEXTAUTH_SECRET,
})

export const config = {
  matcher: [],
}
