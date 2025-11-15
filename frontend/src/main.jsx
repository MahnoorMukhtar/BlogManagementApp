import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/authContextProvider.jsx'
import { BlogProvider } from '../context/BlogContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BlogProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  </StrictMode>,
)
