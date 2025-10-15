import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Calendar,
  Images,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { api } from '../services/api'

interface DashboardStats {
  totalTours: number
  recentTours: number
  byStatus: {
    pending: number
    confirmed: number
    completed: number
    cancelled: number
  }
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/tours/stats/overview')
      setStats(response.data.data)
    } catch (err: any) {
      setError('Failed to load dashboard statistics')
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Tours',
      value: stats?.totalTours || 0,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      name: 'Recent Tours (7 days)',
      value: stats?.recentTours || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
    {
      name: 'Pending Tours',
      value: stats?.byStatus.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
    },
    {
      name: 'Confirmed Tours',
      value: stats?.byStatus.confirmed || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your Golden Days AFH administration
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tour Status Breakdown */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Tour Status Breakdown
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="ml-2 text-sm font-medium text-yellow-800">
                  Pending
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-yellow-900">
                {stats?.byStatus.pending || 0}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm font-medium text-green-800">
                  Confirmed
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-green-900">
                {stats?.byStatus.confirmed || 0}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="ml-2 text-sm font-medium text-blue-800">
                  Completed
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-900">
                {stats?.byStatus.completed || 0}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="ml-2 text-sm font-medium text-red-800">
                  Cancelled
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold text-red-900">
                {stats?.byStatus.cancelled || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Images className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Photo Gallery
                  </dt>
                  <dd className="text-sm text-gray-900">
                    Manage facility photos
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/photos"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors"
              >
                Manage Photos
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Scheduled Tours
                  </dt>
                  <dd className="text-sm text-gray-900">
                    View and manage tour requests
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/tours"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors"
              >
                View Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
