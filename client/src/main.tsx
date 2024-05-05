import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from '@clerk/clerk-react';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import RooteLayout from './layout/RooteLayout.tsx';
import Home from './pages/Home.tsx';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  return (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
  )
}

const RouterComponent = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider 
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} 
      navigate={(to: any) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<RooteLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)


export default RouterComponent;