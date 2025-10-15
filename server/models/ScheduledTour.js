import mongoose from 'mongoose'

const scheduledTourSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'],
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required'],
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
      enum: {
        values: ['morning', 'afternoon', 'evening'],
        message: 'Preferred time must be morning, afternoon, or evening',
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'completed', 'cancelled'],
        message: 'Status must be pending, confirmed, completed, or cancelled',
      },
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    confirmedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
scheduledTourSchema.index({ status: 1, preferredDate: 1 })
scheduledTourSchema.index({ email: 1 })

// Virtual for full name
scheduledTourSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Ensure virtual fields are serialized
scheduledTourSchema.set('toJSON', { virtuals: true })

const ScheduledTour = mongoose.model('ScheduledTour', scheduledTourSchema)

export default ScheduledTour

