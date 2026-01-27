import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useCurrentUser, isClerkConfigured } from '../lib/auth'

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useCurrentUser()
  const location = useLocation()

  // If Clerk not configured, allow access (for demo purposes)
  if (!isClerkConfigured()) {
    return children
  }

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    )
  }

  // Redirect to login if not signed in
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
