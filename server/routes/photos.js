import express from 'express'
import { body, validationResult } from 'express-validator'
import Photo from '../models/Photo.js'
import { upload } from '../config/cloudinary.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const photoValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be 1-100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be 1-500 characters'),
  body('category')
    .isIn(['rooms', 'common-areas', 'dining', 'activities'])
    .withMessage('Invalid category'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),
]

// @route   GET /api/photos
// @desc    Get all photos with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, isActive } = req.query
    const filter = {}

    if (category) filter.category = category
    if (isActive !== undefined) filter.isActive = isActive === 'true'

    const photos = await Photo.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ displayOrder: 1, createdAt: -1 })

    res.json({
      success: true,
      count: photos.length,
      data: photos,
    })
  } catch (error) {
    console.error('Error fetching photos:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching photos',
    })
  }
})

// @route   GET /api/photos/:id
// @desc    Get single photo by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate(
      'uploadedBy',
      'name email'
    )

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found',
      })
    }

    res.json({
      success: true,
      data: photo,
    })
  } catch (error) {
    console.error('Error fetching photo:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching photo',
    })
  }
})

// @route   POST /api/photos
// @desc    Upload new photo
// @access  Private (Admin)
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  photoValidation,
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array(),
        })
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image file is required',
        })
      }

      const { title, description, category, displayOrder } = req.body

      const photo = new Photo({
        title,
        description,
        category,
        displayOrder: displayOrder || 0,
        imageUrl: req.file.path,
        cloudinaryId: req.file.filename,
        uploadedBy: req.admin._id,
      })

      await photo.save()
      await photo.populate('uploadedBy', 'name email')

      res.status(201).json({
        success: true,
        message: 'Photo uploaded successfully',
        data: photo,
      })
    } catch (error) {
      console.error('Error uploading photo:', error)
      res.status(500).json({
        success: false,
        message: 'Error uploading photo',
      })
    }
  }
)

// @route   PUT /api/photos/:id
// @desc    Update photo
// @access  Private (Admin)
router.put('/:id', authenticateToken, photoValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    const { title, description, category, displayOrder, isActive } = req.body

    const photo = await Photo.findById(req.params.id)
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found',
      })
    }

    photo.title = title
    photo.description = description
    photo.category = category
    photo.displayOrder = displayOrder || photo.displayOrder
    if (isActive !== undefined) photo.isActive = isActive

    await photo.save()
    await photo.populate('uploadedBy', 'name email')

    res.json({
      success: true,
      message: 'Photo updated successfully',
      data: photo,
    })
  } catch (error) {
    console.error('Error updating photo:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating photo',
    })
  }
})

// @route   DELETE /api/photos/:id
// @desc    Delete photo
// @access  Private (Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id)
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found',
      })
    }

    // Delete from Cloudinary
    const { cloudinary } = await import('../config/cloudinary.js')
    await cloudinary.uploader.destroy(photo.cloudinaryId)

    await Photo.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Photo deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting photo:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting photo',
    })
  }
})

export default router
