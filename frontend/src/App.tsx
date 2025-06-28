import { useState, useEffect } from 'react'
import { LoginForm } from './components/auth/LoginForm'
import { Dashboard } from './components/dashboard/Dashboard'
import { Toaster } from './components/ui/toaster'

interface User {
  id: string
  email: string
  role: 'admin' | 'staff' | 'family' | 'providers'
  first_name: string
  last_name: string
}

function App() {
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'admin@test.com',
    role: 'admin',
    first_name: 'Test',
    last_name: 'Admin'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (userData: User, token: string) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  )
}

export default App
