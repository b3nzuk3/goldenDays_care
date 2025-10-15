# 🚀 Golden Days Development Guide

## 📋 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Windows
setup-dev.bat

# Mac/Linux
./setup-dev.sh
```

### Option 2: Manual Setup

```bash
# Install dependencies
npm install
cd admin-dashboard && npm install
cd ../server && npm install

# Configure environment
cp server/.env.example server/.env
# Edit server/.env with your MongoDB and Cloudinary credentials
```

## 🛠 Development Commands

### Run Everything at Once

```bash
npm run dev:all
```

This runs:

- Main app: `http://localhost:3000`
- Admin dashboard: `http://localhost:3001`
- API server: `http://localhost:5000`

### Run Individual Services

```bash
# Main app only
npm run dev

# Admin dashboard only
npm run dev:admin

# API server only
npm run dev:api
```

## 🔧 Environment Configuration

### Backend (.env)

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/golden-days-admin
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/golden-days-admin

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Server
PORT=5000
NODE_ENV=development

# Admin
ADMIN_EMAIL=admin@goldendays.com
ADMIN_PASSWORD=admin123
```

### Admin Dashboard (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Golden Days Admin
```

## 🗄️ Database Setup

### MongoDB Local

```bash
# Install MongoDB locally
# Then start MongoDB service
mongod
```

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

### Create Admin User

```bash
cd server
node scripts/setup-admin.js
```

## ☁️ Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get your credentials from dashboard
3. Update `server/.env` with your credentials

## 🚀 Development Workflow

### Daily Development

1. **Start all services**: `npm run dev:all`
2. **Main app**: Work on your existing site at `localhost:3000`
3. **Admin**: Manage photos/tours at `localhost:3001`
4. **API**: Backend runs at `localhost:5000`

### File Structure

```
golden-days-careflow/
├── src/                    # Your existing frontend
├── admin-dashboard/        # New admin dashboard
├── server/                 # Backend API
├── package.json           # Main app config
└── README.md              # This guide
```

## 🔄 Integration Options

### Option 1: Separate Apps (Current Setup)

- **Main app**: `localhost:3000` (your existing site)
- **Admin**: `localhost:3001` (new admin dashboard)
- **API**: `localhost:5000` (backend)

**Pros**: Clean separation, independent deployments
**Cons**: Two apps to maintain

### Option 2: Integrated Routes

Add admin routes to your existing app:

```typescript
// Add to your existing App.tsx
<Route path="/admin/*" element={<AdminDashboard />} />
```

**Pros**: Single app, shared components
**Cons**: Larger bundle, mixed concerns

## 🐛 Common Issues & Solutions

### Issue 1: Port Conflicts

**Problem**: "Port 3000 already in use"
**Solution**:

```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- --port 3002
```

### Issue 2: CORS Errors

**Problem**: "Access to fetch at 'localhost:5000' from origin 'localhost:3001' has been blocked by CORS policy"
**Solution**: CORS is already configured in `server/server.js` for development ports

### Issue 3: MongoDB Connection

**Problem**: "MongoDB connection error"
**Solution**:

1. Check MongoDB is running
2. Verify connection string in `.env`
3. Check network access (for Atlas)

### Issue 4: Cloudinary Upload

**Problem**: "Cloudinary upload failed"
**Solution**:

1. Verify credentials in `.env`
2. Check Cloudinary account status
3. Verify image file size (< 10MB)

### Issue 5: Admin Login

**Problem**: "Invalid credentials"
**Solution**:

1. Run `node server/scripts/setup-admin.js`
2. Check email/password in `.env`
3. Verify admin user exists in database

## 📱 Mobile Development

The admin dashboard is mobile-responsive. For testing:

```bash
# Test on mobile device
npm run dev:admin
# Then access from mobile: http://YOUR_IP:3001
```

## 🚀 Production Deployment

### Separate Deployments (Recommended)

```bash
# Deploy main app
vercel deploy --prod

# Deploy admin dashboard
cd admin-dashboard
vercel deploy --prod --name admin-goldendays

# Deploy API
cd ../server
vercel deploy --prod --name api-goldendays
```

### Environment Variables for Production

```env
# Production .env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/golden-days-admin
CLOUDINARY_CLOUD_NAME=your_prod_cloud_name
CLOUDINARY_API_KEY=your_prod_api_key
CLOUDINARY_API_SECRET=your_prod_api_secret
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

## 🔒 Security Considerations

### Development

- Use strong JWT secrets
- Don't commit `.env` files
- Use local MongoDB for development

### Production

- Use MongoDB Atlas with proper access controls
- Use strong, unique JWT secrets
- Enable HTTPS
- Set up proper CORS origins
- Use environment-specific Cloudinary accounts

## 📊 Monitoring & Debugging

### API Health Check

```bash
curl http://localhost:5000/api/health
```

### Database Connection

```bash
# Check MongoDB connection
cd server
node -e "import('./config/database.js').then(db => console.log('Connected'))"
```

### Admin Dashboard

- Check browser console for errors
- Verify API calls in Network tab
- Check authentication in Application tab

## 🎯 Next Steps

1. **Set up environment variables**
2. **Install dependencies**: `npm install && cd admin-dashboard && npm install && cd ../server && npm install`
3. **Configure MongoDB and Cloudinary**
4. **Create admin user**: `cd server && node scripts/setup-admin.js`
5. **Start development**: `npm run dev:all`
6. **Access admin**: `http://localhost:3001`

## 🆘 Getting Help

### Common Commands

```bash
# Check if ports are in use
netstat -an | findstr :3000
netstat -an | findstr :3001
netstat -an | findstr :5000

# Kill processes on ports
npx kill-port 3000 3001 5000

# Reset node_modules
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

```bash
# Run with debug logs
DEBUG=* npm run dev:api
```

Happy coding! 🚀
