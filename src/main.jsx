import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { CartProvider } from './context/CartContext'
import App from './App.jsx'
import './index.css'

// Get Clerk publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// If no Clerk key, app will still work but auth features disabled
if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === 'pk_test_YOUR_KEY_HERE') {
  console.warn('⚠️ Clerk publishable key not configured. Auth features will be limited.')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {PUBLISHABLE_KEY && PUBLISHABLE_KEY !== 'pk_test_YOUR_KEY_HERE' ? (
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          variables: {
            colorPrimary: '#D43F3F',
            colorBackground: '#ffffff',
            fontFamily: 'Inter, system-ui, sans-serif',
          }
        }}
      >
        <CartProvider>
          <App />
        </CartProvider>
      </ClerkProvider>
    ) : (
      <CartProvider>
        <App />
      </CartProvider>
    )}
  </React.StrictMode>,
)
