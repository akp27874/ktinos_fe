# Ktinos Mobile App - Setup and Run Guide

## 🎉 Migration Complete!

All API integrations have been successfully added to the mobile application!

---

## 📋 What Was Added

### 1. **Authentication API** ✅
- Real login with `/api/v1/auth/login/`
- Token storage and management
- Auto-login on app restart

### 2. **Add Pet Functionality** ✅
- Complete modal with species/breeds API
- Photo upload capability
- Form validation
- Real-time breed filtering

### 3. **Telemetry API** ✅
- Live vitals monitoring (heart rate, temperature, SpO2)
- Historical data visualization
- Integration in PetProfile and HealthMonitoring screens

### 4. **Complete Pet Management** ✅
- Fetch pets from API
- Update pet information
- Add new pets
- Species and breeds selection

---

## 🚀 How to Run the App

### Step 1: Start the Development Server

```bash
cd ktinos_mobile
npx expo start
```

### Step 2: Run on Your Device

#### Option A: Expo Go App (Recommended)
1. Install **Expo Go** from:
   - iOS: App Store
   - Android: Google Play Store

2. Scan the QR code shown in terminal with:
   - iOS: Camera app
   - Android: Expo Go app

#### Option B: Emulator/Simulator
- **Android:** Press `a` in terminal
- **iOS:** Press `i` in terminal
- **Web:** Press `w` in terminal

---

## 📦 Installed Dependencies

All required dependencies are already installed:
- ✅ expo-location (for GPS tracking)
- ✅ expo-image-picker (for photo uploads)
- ✅ @react-navigation/* (navigation)
- ✅ @react-native-async-storage/async-storage (data storage)
- ✅ axios (API calls)
- ✅ react-native-webview (web content)

---

## 🔑 API Configuration

**Base URL:** `https://13.233.237.155`

**Configuration file:** `src/config/api.ts`

### Available Endpoints:
- `/api/v1/auth/login/` - User authentication
- `/api/v1/pets/` - Pet management
- `/api/v1/pets/species/` - Species list
- `/api/v1/pets/breeds/?species_id={id}` - Breeds list
- `/api/v1/telemetry/charts/{deviceId}/` - Telemetry data

---

## 📱 App Features

### 🏠 Dashboard
- View all pets
- Health statistics
- Quick actions
- Floating "Add Pet" button

### ➕ Add New Pet (NEW!)
- Select species from API
- Select breed based on species
- Upload pet photo
- Enter pet details (weight, gender, color, device ID)
- Real-time API integration

### 🐾 Pet Profile
- Live vitals monitoring (NEW API integration!)
- Heart rate, temperature, SpO2
- Pet information
- Health insights

### 📊 Health Monitoring
- Real-time telemetry data (NEW API integration!)
- Activity charts
- Sleep monitoring
- Weekly trends

### ✏️ Pet Details
- Edit pet information
- Update via API
- Form validation

### 🔐 Login
- Email/password authentication
- API integration
- Token management

---

## 🎯 Testing the New Features

### Test 1: Add a New Pet
1. Open the app
2. Go to Dashboard
3. Click the green "+ Add New Pet" button (bottom right)
4. Select a species (e.g., Dog, Cat)
5. Select a breed
6. Fill in pet details
7. Upload a photo (optional)
8. Click "Add Pet"
9. ✅ Pet should appear in the dashboard

### Test 2: View Live Vitals
1. Click on any pet card
2. Click "View Profile"
3. ✅ Should see live vitals (Heart Rate, Temperature, SpO2) from the API
4. If pet has a device ID, real data will load

### Test 3: Health Monitoring
1. Go to Dashboard
2. Navigate to Health Monitoring
3. ✅ Should see real telemetry data
4. Heart rate chart should display API data

### Test 4: Update Pet
1. Go to any pet's details
2. Click "Edit"
3. Modify information
4. Click "Save"
5. ✅ Changes should be saved via API

---

## 🔧 Troubleshooting

### Issue: "Metro waiting..."
**Solution:** This is normal! The app is ready. Scan the QR code with Expo Go.

### Issue: "Network Error"
**Solution:** 
- Check if the backend API is running
- Verify BASE_URL in `src/config/api.ts`
- Ensure your device/emulator can reach the API

### Issue: "Module not found"
**Solution:**
```bash
rm -rf node_modules
npm install --legacy-peer-deps
npx expo start --clear
```

### Issue: "Camera/Photo Library permission denied"
**Solution:** 
- Grant permissions in device settings
- On iOS: Settings → Ktinoskare → Photos
- On Android: Settings → Apps → Ktinoskare → Permissions

---

## 📂 Project Structure

```
ktinos_mobile/
├── src/
│   ├── components/
│   │   └── AddPetModal.tsx          ← NEW! Add pet with API
│   ├── config/
│   │   ├── api.ts                   ← API endpoints
│   │   └── axiosInstance.ts         ← HTTP client
│   ├── context/
│   │   ├── AuthContext.tsx          ← Updated with API
│   │   └── PetsContext.tsx          ← Pets management
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   └── DashboardNavigator.tsx
│   ├── screens/
│   │   ├── LoginScreen.tsx          ← Authentication
│   │   ├── DashboardScreen.tsx      ← Updated with Add Pet
│   │   ├── PetProfileScreen.tsx     ← Updated with telemetry API
│   │   ├── PetDetailsScreen.tsx     ← Update pet API
│   │   ├── HealthMonitoringScreen.tsx ← Updated with telemetry API
│   │   ├── GpsTrackingScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── UserListScreen.tsx
│   ├── data/
│   │   └── pets.ts                  ← Mock data
│   └── theme.ts                     ← App theme
├── app.json                          ← Updated with permissions
├── package.json
└── tsconfig.json                     ← Fixed!
```

---

## 📸 Screenshots Expected

### Dashboard
- List of pets
- Health stats
- Green floating "+ Add New Pet" button

### Add Pet Modal
- Species selection (horizontal scroll)
- Breed selection (horizontal scroll)
- Photo upload button
- Form fields (name, weight, gender, color, device ID)
- Save/Cancel buttons

### Pet Profile
- Live vitals cards (Heart Rate, Temperature, SpO2)
- Pet information card
- Health insight section

### Health Monitoring
- Activity chart
- Sleep monitoring
- Weekly trends
- Health alerts

---

## 🎨 Design

The mobile app maintains the same design language as the web version:
- **Primary Color:** Deep Purple (#6A1B9A)
- **Accent Color:** Health Green (#10B981)
- **Secondary:** Soft Lavender, Teal Wellness
- **Typography:** Clean, modern sans-serif
- **Components:** Rounded cards, smooth animations

---

## 🔒 Security

- Tokens stored securely in AsyncStorage
- HTTPS API calls only
- Input validation on all forms
- Error handling for failed API calls

---

## 🚀 Next Steps

1. Test all features thoroughly
2. Add error boundaries for better error handling
3. Implement push notifications
4. Add offline mode support
5. Implement refresh token logic
6. Add unit tests

---

## 📞 Support

If you encounter any issues:
1. Check the terminal for error messages
2. Review `API_INTEGRATIONS.md` for API details
3. Verify network connectivity
4. Check API endpoint availability

---

## ✨ Success Indicators

You'll know everything is working when:
- ✅ App launches without errors
- ✅ Login redirects to dashboard
- ✅ Pets load from API
- ✅ "Add Pet" button shows modal
- ✅ Species and breeds load from API
- ✅ Photo picker opens
- ✅ New pets appear after adding
- ✅ Vitals show real data in Pet Profile
- ✅ Health Monitoring displays telemetry data
- ✅ Pet details can be edited and saved

---

## 🎉 Congratulations!

Your Ktinoskare mobile app now has complete API integration matching the web version!

**Happy coding! 🐾**
