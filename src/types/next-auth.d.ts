import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      username: string
      email: email
      token: string
    }
  }
}

export default NextAuth
