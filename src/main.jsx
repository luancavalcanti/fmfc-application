import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contex/userContex.jsx'
import { EmployeeProvider } from './contex/EmployeeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
    </UserProvider>
  </StrictMode>,
)
