# Admin Dashboard Integration Guide

## 🎯 Integration Options

### Option 1: Separate Admin App (Recommended)

- **Pros**: Clean separation, independent deployments, better security
- **Cons**: Two separate apps to maintain
- **Best for**: Production environments

### Option 2: Integrated Routes

- **Pros**: Single app, shared components
- **Cons**: Larger bundle, mixed concerns
- **Best for**: Development/small teams

## 🚀 Option 1: Separate Admin App

### Development Setup

```bash
# Your existing app (port 3000)
cd golden-days-careflow
npm run dev

# Admin dashboard (port 3001)
cd admin-dashboard
npm run dev

# Backend API (port 5000)
cd server
npm run dev
```

### Production Deployment

```bash
# Deploy main site
vercel deploy --prod

# Deploy admin dashboard
cd admin-dashboard
vercel deploy --prod --name admin-goldendays
```

### Environment Configuration

```env
# Main site .env
VITE_API_URL=https://api.goldendays.com

# Admin dashboard .env
VITE_API_URL=https://api.goldendays.com
VITE_ADMIN_ROUTE=/admin
```

## 🔧 Option 2: Integrated Routes

### Add Admin Routes to Existing App

1. **Install admin dependencies in main app:**

```bash
cd golden-days-careflow
npm install axios date-fns
```

2. **Add admin routes to your existing router:**

```typescript
// src/App.tsx (your existing app)
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
```

3. **Create admin layout:**

```typescript
// src/admin/AdminLayout.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminDashboard from './pages/Dashboard'
import Photos from './pages/Photos'
import Tours from './pages/Tours'

export default function AdminLayout() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/photos"
          element={
            <ProtectedRoute>
              <Photos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tours"
          element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
```

## 🛠 Development Issues & Solutions

### Issue 1: Port Conflicts

**Problem**: Multiple apps running on same ports
**Solution**: Use different ports

```bash
# Main app: localhost:3000
# Admin: localhost:3001
# API: localhost:5000
```

### Issue 2: CORS Issues

**Problem**: Frontend can't access backend API
**Solution**: Configure CORS properly

```javascript
// server/server.js
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Main app
      'http://localhost:3001', // Admin dashboard
      'http://localhost:5173', // Vite dev server
    ],
    credentials: true,
  })
)
```

### Issue 3: Environment Variables

**Problem**: Different environments need different configs
**Solution**: Use environment-specific configs

```bash
# .env.development
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_URL=http://localhost:3001

# .env.production
VITE_API_URL=https://api.goldendays.com/api
VITE_ADMIN_URL=https://admin.goldendays.com
```

### Issue 4: Shared Components

**Problem**: Duplicating UI components
**Solution**: Create shared component library

```typescript
// shared/components/Button.tsx
export const Button = ({ variant, children, ...props }) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
}
```

## 🚀 Production Deployment

### Option 1: Separate Deployments

```bash
# Deploy main site
vercel deploy --prod

# Deploy admin dashboard
cd admin-dashboard
vercel deploy --prod --name admin-goldendays

# Deploy API
cd server
vercel deploy --prod --name api-goldendays
```

### Option 2: Monorepo Deployment

```bash
# Deploy everything together
vercel deploy --prod
```

## 🔒 Security Considerations

### Admin Access Control

```typescript
// Add to your main app
const AdminRoute = () => {
  const { user } = useAuth()

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />
  }

  return <AdminDashboard />
}
```

### API Security

```javascript
// server/middleware/auth.js
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'super-admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}
```

## 📱 Mobile Responsiveness

The admin dashboard is already mobile-responsive, but you might want to adjust for your main site's design:

```css
/* admin-dashboard/src/index.css */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.open {
    transform: translateX(0);
  }
}
```

## 🔄 Development Workflow

### Recommended Setup

1. **Main app**: `localhost:3000` (your existing site)
2. **Admin dashboard**: `localhost:3001` (new admin interface)
3. **API server**: `localhost:5000` (backend)

### Development Commands

```bash
# Terminal 1: Main app
cd golden-days-careflow
npm run dev

# Terminal 2: Admin dashboard
cd admin-dashboard
npm run dev

# Terminal 3: API server
cd server
npm run dev
```

## 🎯 My Recommendation

**For your use case, I recommend Option 1 (Separate Apps)** because:

1. **Clean separation** - Admin and public site are different concerns
2. **Independent deployments** - Update admin without affecting main site
3. **Better security** - Admin can be on different domain/subdomain
4. **Easier maintenance** - Smaller, focused codebases
5. **Scalability** - Can scale admin and main site independently

The admin dashboard I created is already set up as a separate app, so you can deploy it independently while keeping your existing frontend unchanged.
