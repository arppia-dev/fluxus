'use client'

import { SessionProvider as AuthSessionProvider } from 'next-auth/react'
import { SessionProviderProps } from './SessionProvider.types'

const SessionProvider = ({ children }: SessionProviderProps) => {
  return <AuthSessionProvider>{children}</AuthSessionProvider>
}

export default SessionProvider
