# 🚀 Quick Start - Deploy Ktinoskare Mobile App

## Fastest Way to Test (Recommended)

### Step 1: Start the Development Server

Open PowerShell and run:

```powershell
cd e:\KTINOS_FE\ktinos_fe\ktinos_mobile
npx expo start
```

### Step 2: Install Expo Go on Your Phone

- **iOS**: Download "Expo Go" from App Store
- **Android**: Download "Expo Go" from Google Play Store

### Step 3: Scan QR Code

- **iOS**: Open Camera app → Point at QR code in terminal → Tap notification
- **Android**: Open Expo Go app → Tap "Scan QR Code" → Point at QR code in terminal

### Step 4: Test the App

The app will open on your phone and connect to the API at `https://13.233.104.107`

---

## Alternative: Use the Deployment Script

Run the interactive deployment script:

```powershell
cd e:\KTINOS_FE\ktinos_fe\ktinos_mobile
.\deploy.ps1
```

Choose option 1 for quick testing with Expo Go.

---

## What You Can Test

Once the app is running on your phone:

✅ **Login**: Use your credentials to authenticate
✅ **Dashboard**: View all pets from the API
✅ **Add Pet**: Tap the green "+" button to add a new pet
✅ **Pet Profile**: View live health vitals (heart rate, temperature, SpO2)
✅ **Health Monitoring**: See telemetry data charts
✅ **GPS Tracking**: Track your pet's location
✅ **Settings**: Configure app preferences

---

## Current API Configuration

- **Base URL**: `https://13.233.104.107`
- **API Version**: `v1`
- **All endpoints**: See `src/config/api.ts`

---

## Need Production Build?

For a standalone APK/IPA to share or publish:

1. Install EAS CLI:
   ```powershell
   npm install -g eas-cli
   ```

2. Login to Expo:
   ```powershell
   eas login
   ```

3. Build for Android:
   ```powershell
   eas build --platform android --profile preview
   ```

4. Download the APK from the link provided

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🎉 That's It!

Your mobile app is now deployed and ready to test with all API integrations working!

**Questions?** Check `DEPLOYMENT_GUIDE.md` for comprehensive documentation.
