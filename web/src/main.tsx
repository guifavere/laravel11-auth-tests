import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Root } from './Root.tsx'
import { Login } from './Login.tsx'
import { Register } from './Register.tsx'
import { Dashboard } from './Dashboard.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
