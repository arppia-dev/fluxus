export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/settings/:path*', '/projects/:path*', '/tasks/:path*'],
}
