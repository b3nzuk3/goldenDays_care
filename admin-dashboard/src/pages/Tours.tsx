import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Phone,
  Mail,
  User,
} from 'lucide-react'
import { api } from '../services/api'
import { format } from 'date-fns'

interface Tour {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: 'morning' | 'afternoon' | 'evening'
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  confirmedBy?: {
    name: string
    email: string
  }
  confirmedAt?: string
  createdAt: string
}

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const timeLabels = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const response = await api.get('/tours')
      setTours(response.data.data)
    } catch (err: any) {
      setError('Failed to load tours')
      console.error('Error fetching tours:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (
    tourId: string,
    newStatus: string,
    notes?: string
  ) => {
    try {
      await api.put(`/tours/${tourId}/status`, { status: newStatus, notes })
      setTours(
        tours.map((tour) =>
          tour._id === tourId
            ? { ...tour, status: newStatus as any, notes }
            : tour
        )
      )
    } catch (err: any) {
      setError('Failed to update tour status')
      console.error('Error updating tour status:', err)
    }
  }

  const handleDelete = async (tourId: string) => {
    if (!window.confirm('Are you sure you want to delete this tour request?')) {
      return
    }

    try {
      await api.delete(`/tours/${tourId}`)
      setTours(tours.filter((tour) => tour._id !== tourId))
    } catch (err: any) {
      setError('Failed to delete tour')
      console.error('Error deleting tour:', err)
    }
  }

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.phone.includes(searchTerm)
    const matchesStatus = !statusFilter || tour.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Scheduled Tours</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage tour requests and appointments
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tours List */}
      {filteredTours.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tours</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter
              ? 'No tours match your filters.'
              : 'No tour requests yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredTours.map((tour) => (
              <li key={tour._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {tour.firstName} {tour.lastName}
                          </h3>
                          <span
                            className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[tour.status]
                            }`}
                          >
                            {tour.status.charAt(0).toUpperCase() +
                              tour.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1" />
                          {tour.email}
                          <Phone className="h-4 w-4 ml-4 mr-1" />
                          {tour.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {format(new Date(tour.preferredDate), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {timeLabels[tour.preferredTime]}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => {
                            setSelectedTour(tour)
                            setShowDetailsModal(true)
                          }}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        {tour.status === 'pending' && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(tour._id, 'confirmed')
                            }
                            className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirm
                          </button>
                        )}
                        {tour.status === 'confirmed' && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(tour._id, 'completed')
                            }
                            className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(tour._id)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  {tour.message && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Message:</strong> {tour.message}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tour Details Modal */}
      {showDetailsModal && selectedTour && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Tour Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedTour.firstName} {selectedTour.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[selectedTour.status]
                    }`}
                  >
                    {selectedTour.status.charAt(0).toUpperCase() +
                      selectedTour.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">{selectedTour.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-sm text-gray-900">{selectedTour.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Preferred Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {format(
                      new Date(selectedTour.preferredDate),
                      'MMM dd, yyyy'
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Preferred Time
                  </label>
                  <p className="text-sm text-gray-900">
                    {timeLabels[selectedTour.preferredTime]}
                  </p>
                </div>
              </div>

              {selectedTour.message && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Message
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedTour.message}
                  </p>
                </div>
              )}

              {selectedTour.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Admin Notes
                  </label>
                  <p className="text-sm text-gray-900">{selectedTour.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
              {selectedTour.status === 'pending' && (
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedTour._id, 'confirmed')
                    setShowDetailsModal(false)
                  }}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Confirm Tour
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tours

