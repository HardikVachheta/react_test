import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useSelector } from 'react-redux'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { ProductPage } from './pages/ProductPage'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate replace to='/login' />;
}

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <div className='App'>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <strong>Product Management</strong>
          {token && <span style={{ marginLeft: '20px', color:'green' }}>Authenticated</span>}
        </nav>
        <main style={{ padding: '2rem' }}>
          <Routes>

            <Route
              path='/login'
              element={!token ? <LoginPage /> : <Navigate to='/products' />} />
            <Route
              path='/products'
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              } />
            {/* // element={!token ? <LoginPage /> : <Navigate to='/products' />} /> */}
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='*' element={<h2>404 : Page Not Found</h2>} />

          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
