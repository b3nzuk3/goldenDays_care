import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Photo title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Photo description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Photo category is required'],
      enum: {
        values: ['rooms', 'common-areas', 'dining', 'activities'],
        message:
          'Category must be one of: rooms, common-areas, dining, activities',
      },
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    cloudinaryId: {
      type: String,
      required: [true, 'Cloudinary ID is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
photoSchema.index({ category: 1, isActive: 1 })
photoSchema.index({ displayOrder: 1 })

const Photo = mongoose.model('Photo', photoSchema)

export default Photo

