import { API_AUTH } from '@/utils/const'
import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = nextAuth({
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${API_AUTH.LOGIN}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          },
        )

        const data = await response.json()

        if (data && data.error) {
          throw Error('Unable to sign in, please try again later.')
        }

        return {
          token: data.jwt,
          ...data.user,
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user }
    },
    session: async ({ session, token }) => {
      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
