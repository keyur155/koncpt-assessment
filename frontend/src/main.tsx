import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./provider/QueryProvider.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              },
            }}
          />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
)
