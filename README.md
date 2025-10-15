# Golden Days AFH Admin Dashboard

A comprehensive admin dashboard backend for managing photos and scheduled tours for Golden Days Adult Family Home.

## Features

### Backend (Node.js + Express + MongoDB + Cloudinary)

- **Photo Gallery Management**: Upload, organize, and manage facility photos
- **Tour Scheduling**: Handle tour requests and appointments
- **Admin Authentication**: Secure admin access with JWT tokens
- **Image Storage**: Cloudinary integration for optimized image hosting
- **Database**: MongoDB for data persistence
- **API Documentation**: RESTful API endpoints

### Frontend (React + TypeScript + Tailwind CSS)

- **Modern Dashboard**: Clean, responsive admin interface
- **Photo Management**: Upload, edit, and organize photos by category
- **Tour Management**: View, confirm, and manage tour requests
- **Real-time Updates**: Live data synchronization
- **Mobile Responsive**: Works on all device sizes

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Git

### Backend Setup

1. **Clone and navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   MONGODB_URI=mongodb://localhost:27017/golden-days-admin
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ADMIN_EMAIL=admin@goldendays.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

5. **Setup default admin** (optional)
   ```bash
   node scripts/setup-admin.js
   ```

### Frontend Setup

1. **Navigate to admin dashboard**

   ```bash
   cd admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Access the dashboard**
   - Open http://localhost:3001
   - Login with your admin credentials

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info
- `POST /api/auth/register` - Register new admin

### Photos

- `GET /api/photos` - Get all photos (with filtering)
- `GET /api/photos/:id` - Get single photo
- `POST /api/photos` - Upload new photo
- `PUT /api/photos/:id` - Update photo
- `DELETE /api/photos/:id` - Delete photo

### Tours

- `POST /api/tours` - Submit tour request (public)
- `GET /api/tours` - Get all tours (admin)
- `GET /api/tours/:id` - Get single tour
- `PUT /api/tours/:id/status` - Update tour status
- `DELETE /api/tours/:id` - Delete tour
- `GET /api/tours/stats/overview` - Get tour statistics

## Database Models

### Photo Model

```javascript
{
  title: String,
  description: String,
  category: ['rooms', 'common-areas', 'dining', 'activities'],
  imageUrl: String,
  cloudinaryId: String,
  isActive: Boolean,
  displayOrder: Number,
  uploadedBy: ObjectId (Admin),
  createdAt: Date,
  updatedAt: Date
}
```

### ScheduledTour Model

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  preferredDate: Date,
  preferredTime: ['morning', 'afternoon', 'evening'],
  message: String,
  status: ['pending', 'confirmed', 'completed', 'cancelled'],
  notes: String,
  confirmedBy: ObjectId (Admin),
  confirmedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['admin', 'super-admin'],
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Photo Categories

The system supports four main photo categories:

- **Rooms**: Individual resident rooms and private spaces
- **Common Areas**: Shared living spaces, lounges, and common rooms
- **Dining**: Dining areas and meal spaces
- **Activities**: Activity rooms, recreational areas, and social spaces

## Tour Management Workflow

1. **Tour Request**: Public form submission creates a "pending" tour
2. **Review**: Admin reviews the request details
3. **Confirmation**: Admin can confirm the tour (status: "confirmed")
4. **Completion**: After the tour, admin marks it as "completed"
5. **Cancellation**: Tours can be cancelled if needed

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- File upload restrictions

## Deployment

### Backend Deployment

1. Set up MongoDB Atlas or local MongoDB
2. Configure Cloudinary account
3. Set environment variables
4. Deploy to your preferred platform (Heroku, Vercel, AWS, etc.)

### Frontend Deployment

1. Build the React app: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure API proxy or CORS settings

## Development

### Backend Development

```bash
cd server
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development

```bash
cd admin-dashboard
npm run dev  # Starts Vite dev server
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
