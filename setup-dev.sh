#!/bin/bash

# Golden Days Development Setup Script
echo "🚀 Setting up Golden Days development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

# Install admin dashboard dependencies
echo "📦 Installing admin dashboard dependencies..."
cd ../admin-dashboard
if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Admin dashboard dependencies installed"
else
    echo "✅ Admin dashboard dependencies already installed"
fi

# Install main app dependencies (if needed)
echo "📦 Checking main app dependencies..."
cd ..
if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Main app dependencies installed"
else
    echo "✅ Main app dependencies already installed"
fi

# Create environment files if they don't exist
echo "🔧 Setting up environment files..."

if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env from example"
    echo "⚠️  Please configure your environment variables in server/.env"
else
    echo "✅ server/.env already exists"
fi

# Create admin dashboard environment file
if [ ! -f "admin-dashboard/.env" ]; then
    cat > admin-dashboard/.env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Golden Days Admin
EOF
    echo "✅ Created admin-dashboard/.env"
else
    echo "✅ admin-dashboard/.env already exists"
fi

echo ""
echo "🎉 Setup complete! Here's how to run the development environment:"
echo ""
echo "📋 Development Commands:"
echo ""
echo "Terminal 1 - Backend API:"
echo "  cd server && npm run dev"
echo ""
echo "Terminal 2 - Admin Dashboard:"
echo "  cd admin-dashboard && npm run dev"
echo ""
echo "Terminal 3 - Main App (your existing app):"
echo "  npm run dev"
echo ""
echo "🌐 URLs:"
echo "  Main App: http://localhost:3000"
echo "  Admin Dashboard: http://localhost:3001"
echo "  API: http://localhost:5000"
echo ""
echo "⚠️  Don't forget to:"
echo "  1. Configure MongoDB connection in server/.env"
echo "  2. Set up Cloudinary credentials in server/.env"
echo "  3. Run 'node server/scripts/setup-admin.js' to create admin user"
echo ""
echo "Happy coding! 🚀"
