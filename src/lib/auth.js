import React from 'react'
import { useAuth, useUser, useClerk } from '@clerk/clerk-react'

// Check if Clerk is configured
export const isClerkConfigured = () => {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  return key && key !== 'pk_test_YOUR_KEY_HERE'
}

// Hook to get current user (works with or without Clerk)
export function useCurrentUser() {
  // If Clerk not configured, return mock state
  if (!isClerkConfigured()) {
    return {
      isSignedIn: false,
      isLoaded: true,
      user: null,
    }
  }

  try {
    const { isSignedIn, isLoaded } = useAuth()
    const { user } = useUser()
    
    return {
      isSignedIn: isSignedIn || false,
      isLoaded: isLoaded || true,
      user: user ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      } : null,
    }
  } catch {
    return { isSignedIn: false, isLoaded: true, user: null }
  }
}

// Hook to get auth actions
export function useAuthActions() {
  if (!isClerkConfigured()) {
    return {
      signOut: () => console.log('Clerk not configured'),
      openSignIn: () => window.location.href = '/login',
      openSignUp: () => window.location.href = '/register',
    }
  }

  try {
    const { signOut, openSignIn, openSignUp } = useClerk()
    return { signOut, openSignIn, openSignUp }
  } catch {
    return {
      signOut: () => {},
      openSignIn: () => window.location.href = '/login',
      openSignUp: () => window.location.href = '/register',
    }
  }
}
