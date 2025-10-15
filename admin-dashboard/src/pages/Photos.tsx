import React, { useState, useEffect } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Images,
} from 'lucide-react'
import { api } from '../services/api'

interface Photo {
  _id: string
  title: string
  description: string
  category: 'rooms' | 'common-areas' | 'dining' | 'activities'
  imageUrl: string
  isActive: boolean
  displayOrder: number
  createdAt: string
  uploadedBy: {
    name: string
    email: string
  }
}

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [uploading, setUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    file: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'rooms', label: 'Rooms' },
    { value: 'common-areas', label: 'Common Areas' },
    { value: 'dining', label: 'Dining' },
    { value: 'activities', label: 'Activities' },
  ]

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await api.get('/photos')
      setPhotos(response.data.data)
    } catch (err: any) {
      setError('Failed to load photos')
      console.error('Error fetching photos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (photoId: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      await api.delete(`/photos/${photoId}`)
      setPhotos(photos.filter((photo) => photo._id !== photoId))
    } catch (err: any) {
      setError('Failed to delete photo')
      console.error('Error deleting photo:', err)
    }
  }

  const handleToggleActive = async (photo: Photo) => {
    try {
      await api.put(`/photos/${photo._id}`, {
        ...photo,
        isActive: !photo.isActive,
      })
      setPhotos(
        photos.map((p) =>
          p._id === photo._id ? { ...p, isActive: !photo.isActive } : p
        )
      )
    } catch (err: any) {
      setError('Failed to update photo status')
      console.error('Error updating photo:', err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadForm({
      ...uploadForm,
      file,
    })

    // Create preview URL
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('title', uploadForm.title)
      formData.append('description', uploadForm.description)
      formData.append('category', uploadForm.category)
      formData.append('image', uploadForm.file)

      const response = await api.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setPhotos([response.data.data, ...photos])
      setShowUploadModal(false)
      setUploadForm({ title: '', description: '', category: '', file: null })
      setImagePreview(null)
    } catch (err: any) {
      setError('Failed to upload photo')
      console.error('Error uploading photo:', err)
    } finally {
      setUploading(false)
    }
  }

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !selectedCategory || photo.category === selectedCategory
    return matchesSearch && matchesCategory
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage facility photos for the gallery
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Photo
          </button>
        </div>
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
                placeholder="Search photos..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-400'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-400'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Photos Grid/List */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <Images className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No photos</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedCategory
              ? 'No photos match your filters.'
              : 'Get started by uploading a photo.'}
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
          }
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo._id}
              className={`bg-white rounded-lg shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {viewMode === 'grid' ? (
                <div className="p-6">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        photo.category === 'rooms'
                          ? 'bg-blue-100 text-blue-800'
                          : photo.category === 'common-areas'
                          ? 'bg-green-100 text-green-800'
                          : photo.category === 'dining'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {photo.category.replace('-', ' ')}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        photo.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {photo.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {photo.description}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPhoto(photo)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(photo)}
                      className={`inline-flex items-center px-3 py-1 border text-sm font-medium rounded-md ${
                        photo.isActive
                          ? 'border-red-300 text-red-700 bg-white hover:bg-red-50'
                          : 'border-green-300 text-green-700 bg-white hover:bg-green-50'
                      }`}
                    >
                      {photo.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(photo._id)}
                      className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {photo.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              photo.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {photo.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {photo.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            photo.category === 'rooms'
                              ? 'bg-blue-100 text-blue-800'
                              : photo.category === 'common-areas'
                              ? 'bg-green-100 text-green-800'
                              : photo.category === 'dining'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {photo.category.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-400">
                          Uploaded by {photo.uploadedBy.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingPhoto(photo)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(photo)}
                        className={`inline-flex items-center px-3 py-1 border text-sm font-medium rounded-md ${
                          photo.isActive
                            ? 'border-red-300 text-red-700 bg-white hover:bg-red-50'
                            : 'border-green-300 text-green-700 bg-white hover:bg-green-50'
                        }`}
                      >
                        {photo.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(photo._id)}
                        className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Upload Photo
            </h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter photo title"
                  value={uploadForm.title}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter photo description"
                  value={uploadForm.description}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  value={uploadForm.category}
                  onChange={(e) =>
                    setUploadForm({ ...uploadForm, category: e.target.value })
                  }
                >
                  <option value="">Select category</option>
                  <option value="rooms">Rooms</option>
                  <option value="common-areas">Common Areas</option>
                  <option value="dining">Dining</option>
                  <option value="activities">Activities</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo File
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF, WebP (max 10MB)
                </p>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full max-h-64 rounded-lg border border-gray-300 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setUploadForm({ ...uploadForm, file: null })
                          // Reset file input
                          const fileInput = document.querySelector(
                            'input[type="file"]'
                          ) as HTMLInputElement
                          if (fileInput) fileInput.value = ''
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        title="Remove preview"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false)
                    setImagePreview(null)
                  }}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Photos
