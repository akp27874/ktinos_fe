# Ktinoskare Mobile App - Deployment Guide

## 🚀 Deployment Options

There are several ways to deploy your Expo mobile application:

### Option 1: Expo Go (Testing/Development) ⚡ **FASTEST**
### Option 2: EAS Build (Production Apps) 📦 **RECOMMENDED**
### Option 3: Local Build (Advanced) 🔧

---

## Option 1: Expo Go - Development Testing (Quickest)

This is the **fastest way** to get your app running on a real device for testing.

### Steps:

1. **Start the development server:**
   ```bash
   cd ktinos_mobile
   npx expo start
   ```

2. **Install Expo Go app on your phone:**
   - iOS: Download from App Store
   - Android: Download from Google Play Store

3. **Connect to the app:**
   - **iOS:** Open Camera app → Scan QR code → Tap notification
   - **Android:** Open Expo Go app → Scan QR code

### ✅ When to use:
- Quick testing
- Development
- Sharing with team members
- Demo purposes

### ❌ Limitations:
- Requires Expo Go app installed
- Not for production/app store
- Limited customization

---

## Option 2: EAS Build - Production Ready (Recommended)

EAS (Expo Application Services) builds standalone apps ready for App Store/Play Store.

### Prerequisites:

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure the project:**
   ```bash
   cd ktinos_mobile
   eas build:configure
   ```

### Build for Android (APK):

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Google Play Store
eas build --platform android --profile production
```

### Build for iOS:

```bash
# Build for iOS Simulator
eas build --platform ios --profile preview

# Build for App Store
eas build --platform ios --profile production
```

### Download and Install:

1. After the build completes, you'll get a download link
2. For Android: Download APK and install directly
3. For iOS: Download IPA and install via TestFlight or Xcode

### ✅ When to use:
- Production apps
- App Store/Play Store submission
- Sharing with clients
- Public releases

---

## Option 3: Local Build (Advanced)

Build locally on your machine without EAS.

### For Android:

1. **Install Android Studio and SDK**
2. **Build locally:**
   ```bash
   npx expo prebuild --platform android
   npx expo run:android
   ```

### For iOS (Mac only):

1. **Install Xcode**
2. **Build locally:**
   ```bash
   npx expo prebuild --platform ios
   npx expo run:ios
   ```

---

## 📱 Testing the API Integration

Once deployed, test these features:

### 1. Authentication Test
```
1. Open app
2. Enter credentials:
   - Email: test@example.com
   - Password: your_password
3. Tap "Sign In to Dashboard"
4. ✅ Should redirect to dashboard
```

### 2. Add Pet Test
```
1. On Dashboard, tap "+ Add New Pet" button
2. Select species (API call to /api/v1/pets/species/)
3. Select breed (API call to /api/v1/pets/breeds/)
4. Fill in details
5. Tap "Add Pet"
6. ✅ New pet should appear in dashboard
```

### 3. View Live Vitals Test
```
1. Tap on any pet card
2. Tap "View Profile"
3. ✅ Should see Heart Rate, Temperature, SpO2 from API
```

### 4. Health Monitoring Test
```
1. Navigate to Health Monitoring screen
2. ✅ Should display telemetry data charts
```

---

## 🔧 Configuration Before Deployment

### 1. Update API URL (if needed)

**File:** `src/config/api.ts`

```typescript
// Current configuration
export const BASE_URL = 'https://13.233.104.107';

// If your API changes, update here
export const BASE_URL = 'https://your-new-api-url.com';
```

### 2. Update App Information

**File:** `app.json`

```json
{
  "expo": {
    "name": "Ktinoskare",
    "slug": "ktinos_mobile",
    "version": "1.0.0",
    // Update bundle identifier for production
    "ios": {
      "bundleIdentifier": "com.yourcompany.ktinoskare"
    },
    "android": {
      "package": "com.yourcompany.ktinoskare"
    }
  }
}
```

### 3. App Icons and Splash Screen

Ensure these files exist in `assets/`:
- ✅ `icon.png` (1024x1024)
- ✅ `splash-icon.png` (1242x2436)
- ✅ `favicon.png` (48x48)
- ✅ `android-icon-foreground.png`
- ✅ `android-icon-background.png`

---

## 🌐 Network Requirements

Your deployed app needs to access:
- **API Server:** `https://13.233.104.107`
- **Endpoints:**
  - `/api/v1/auth/login/`
  - `/api/v1/pets/`
  - `/api/v1/pets/species/`
  - `/api/v1/pets/breeds/`
  - `/api/v1/telemetry/charts/{deviceId}/`

### Important Notes:
- Ensure API server has CORS enabled for mobile requests
- Use HTTPS for production
- API should be publicly accessible or use VPN

---

## 📦 EAS Build Configuration

Create `eas.json` in project root:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "buildType": "archive"
      }
    }
  }
}
```

---

## 🚢 Deployment Checklist

### Before Building:
- [ ] API URL is correct in `src/config/api.ts`
- [ ] App name and version updated in `app.json`
- [ ] Icons and splash screen are ready
- [ ] Bundle identifiers are configured
- [ ] Permissions are correctly set
- [ ] Test all API endpoints

### Building:
- [ ] EAS CLI is installed
- [ ] Logged into Expo account
- [ ] Build profile is configured
- [ ] Build command executed successfully
- [ ] Build artifacts downloaded

### Testing:
- [ ] App installs successfully
- [ ] Login works with API
- [ ] Pets load from API
- [ ] Add pet functionality works
- [ ] Telemetry data displays
- [ ] All screens navigate correctly

### Production:
- [ ] App Store/Play Store accounts ready
- [ ] Privacy policy URL added
- [ ] Terms of service URL added
- [ ] App screenshots prepared
- [ ] App description written
- [ ] App reviewed and approved

---

## 🎯 Quick Start Command (Recommended)

For immediate testing with Expo Go:

```bash
cd e:\KTINOS_FE\ktinos_fe\ktinos_mobile
npx expo start
```

Then scan the QR code with your phone's Expo Go app!

---

## 📞 Support & Troubleshooting

### Common Issues:

**Issue: "Unable to connect to API"**
- Check if API server is running
- Verify BASE_URL in config
- Check device network connection
- Ensure device can reach the API (same network or public API)

**Issue: "Build failed on EAS"**
- Check build logs
- Verify app.json configuration
- Ensure all dependencies are compatible
- Try cleaning and rebuilding

**Issue: "App crashes on startup"**
- Check logs: `npx expo start` shows errors
- Verify all dependencies are installed
- Check for TypeScript errors

---

## 🔗 Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Guide](https://docs.expo.dev/build/introduction/)
- [Publishing to App Stores](https://docs.expo.dev/distribution/introduction/)
- [Expo Go App](https://expo.dev/go)

---

## ✨ Success!

Once deployed, your Ktinoskare mobile app will:
- ✅ Authenticate users via API
- ✅ Manage pets (add, view, update)
- ✅ Display real-time health monitoring
- ✅ Show telemetry data from devices
- ✅ Provide complete pet care management

**Ready to deploy! 🚀🐾**
