# Ktinoskare Mobile App - Quick Deployment Script

Write-Host "🚀 Ktinoskare Mobile App Deployment" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Choose deployment option:" -ForegroundColor Yellow
Write-Host "1. Start Expo Dev Server (Expo Go - Fastest for testing)" -ForegroundColor Green
Write-Host "2. Build Android APK (EAS - For production testing)" -ForegroundColor Green
Write-Host "3. Build iOS App (EAS - For production testing)" -ForegroundColor Green
Write-Host "4. Install dependencies first" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🎯 Starting Expo Development Server..." -ForegroundColor Cyan
        Write-Host "✅ After QR code appears:" -ForegroundColor Yellow
        Write-Host "   - Install 'Expo Go' app on your phone" -ForegroundColor Yellow
        Write-Host "   - Scan QR code with Expo Go (Android) or Camera (iOS)" -ForegroundColor Yellow
        Write-Host ""
        npx expo start
    }
    "2" {
        Write-Host ""
        Write-Host "📦 Building Android APK with EAS..." -ForegroundColor Cyan
        Write-Host "⚠️  You need an Expo account for this" -ForegroundColor Yellow
        Write-Host ""
        
        # Check if EAS CLI is installed
        $easInstalled = Get-Command eas -ErrorAction SilentlyContinue
        if (-not $easInstalled) {
            Write-Host "❌ EAS CLI not found. Installing..." -ForegroundColor Red
            npm install -g eas-cli
        }
        
        Write-Host "Logging into Expo..." -ForegroundColor Cyan
        eas login
        
        Write-Host "Building Android APK..." -ForegroundColor Cyan
        eas build --platform android --profile preview
    }
    "3" {
        Write-Host ""
        Write-Host "📦 Building iOS App with EAS..." -ForegroundColor Cyan
        Write-Host "⚠️  You need an Expo account and Apple Developer account" -ForegroundColor Yellow
        Write-Host ""
        
        # Check if EAS CLI is installed
        $easInstalled = Get-Command eas -ErrorAction SilentlyContinue
        if (-not $easInstalled) {
            Write-Host "❌ EAS CLI not found. Installing..." -ForegroundColor Red
            npm install -g eas-cli
        }
        
        Write-Host "Logging into Expo..." -ForegroundColor Cyan
        eas login
        
        Write-Host "Building iOS App..." -ForegroundColor Cyan
        eas build --platform ios --profile preview
    }
    "4" {
        Write-Host ""
        Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
        npm install --legacy-peer-deps
        Write-Host "✅ Dependencies installed!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Run this script again and choose option 1 to start the dev server." -ForegroundColor Yellow
    }
    default {
        Write-Host ""
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📖 For more details, check DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
