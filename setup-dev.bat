@echo off
echo 🚀 Setting up Golden Days development environment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd server
if not exist "node_modules" (
    npm install
    echo ✅ Backend dependencies installed
) else (
    echo ✅ Backend dependencies already installed
)

REM Install admin dashboard dependencies
echo 📦 Installing admin dashboard dependencies...
cd ..\admin-dashboard
if not exist "node_modules" (
    npm install
    echo ✅ Admin dashboard dependencies installed
) else (
    echo ✅ Admin dashboard dependencies already installed
)

REM Install main app dependencies (if needed)
echo 📦 Checking main app dependencies...
cd ..
if not exist "node_modules" (
    npm install
    echo ✅ Main app dependencies installed
) else (
    echo ✅ Main app dependencies already installed
)

REM Create environment files if they don't exist
echo 🔧 Setting up environment files...

if not exist "server\.env" (
    copy "server\.env.example" "server\.env"
    echo ✅ Created server/.env from example
    echo ⚠️  Please configure your environment variables in server/.env
) else (
    echo ✅ server/.env already exists
)

REM Create admin dashboard environment file
if not exist "admin-dashboard\.env" (
    echo VITE_API_URL=http://localhost:5000/api > admin-dashboard\.env
    echo VITE_APP_NAME=Golden Days Admin >> admin-dashboard\.env
    echo ✅ Created admin-dashboard/.env
) else (
    echo ✅ admin-dashboard/.env already exists
)

echo.
echo 🎉 Setup complete! Here's how to run the development environment:
echo.
echo 📋 Development Commands:
echo.
echo Terminal 1 - Backend API:
echo   cd server ^&^& npm run dev
echo.
echo Terminal 2 - Admin Dashboard:
echo   cd admin-dashboard ^&^& npm run dev
echo.
echo Terminal 3 - Main App (your existing app):
echo   npm run dev
echo.
echo 🌐 URLs:
echo   Main App: http://localhost:3000
echo   Admin Dashboard: http://localhost:3001
echo   API: http://localhost:5000
echo.
echo ⚠️  Don't forget to:
echo   1. Configure MongoDB connection in server/.env
echo   2. Set up Cloudinary credentials in server/.env
echo   3. Run 'node server/scripts/setup-admin.js' to create admin user
echo.
echo Happy coding! 🚀
pause
