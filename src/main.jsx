import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider 
      clientId="885489626025-i725tkjcmt11rkmb8jk27ep03tthkmsm.apps.googleusercontent.com"
      >

    <App />
    </GoogleOAuthProvider>
  </StrictMode>
)
