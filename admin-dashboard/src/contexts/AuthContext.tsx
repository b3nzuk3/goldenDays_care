import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { api } from '../services/api'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  lastLogin?: string
}

interface AuthContextType {
  admin: Admin | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (storedToken) {
      setToken(storedToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
      fetchAdminInfo()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchAdminInfo = async () => {
    try {
      const response = await api.get('/auth/me')
      setAdmin(response.data.data)
    } catch (error) {
      console.error('Failed to fetch admin info:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: newToken, admin: adminData } = response.data.data

      setToken(newToken)
      setAdmin(adminData)
      localStorage.setItem('admin_token', newToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const logout = () => {
    setAdmin(null)
    setToken(null)
    localStorage.removeItem('admin_token')
    delete api.defaults.headers.common['Authorization']
  }

  const value = {
    admin,
    token,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

