# Mobile App API Integrations

## ✅ Completed API Integrations

### 1. Authentication API
**File:** `src/context/AuthContext.tsx`
- **Endpoint:** `POST /api/v1/auth/login/`
- **Description:** User login with email and password
- **Features:**
  - Real API authentication
  - Token storage in AsyncStorage
  - Auto-login on app restart
  - Error handling

**Usage in:**
- `src/screens/LoginScreen.tsx` - Login form with API integration

---

### 2. Pets Management API
**File:** `src/context/PetsContext.tsx`
- **Endpoint:** `GET /api/v1/pets/?owner_id={ownerId}`
- **Description:** Fetch all pets for a user
- **Features:**
  - Automatic fetching on context mount
  - Refresh functionality
  - Loading states

**Endpoints Used:**
- ✅ `GET /api/v1/pets/?owner_id={ownerId}` - Fetch pets
- ✅ `PATCH /api/v1/pets/{petId}/?owner_id={ownerId}` - Update pet
- ✅ `POST /api/v1/pets/` - Add new pet
- ✅ `GET /api/v1/pets/species/` - Get species list
- ✅ `GET /api/v1/pets/breeds/?species_id={speciesId}` - Get breeds list

**Usage in:**
- `src/screens/PetDetailsScreen.tsx` - Update pet information
- `src/components/AddPetModal.tsx` - Add new pet with species/breeds selection

---

### 3. Telemetry/Health Monitoring API
**File:** Multiple screens
- **Endpoint:** `GET /api/v1/telemetry/charts/{deviceId}/`
- **Description:** Fetch real-time health vitals and telemetry data
- **Features:**
  - Heart rate monitoring
  - Temperature tracking
  - SpO2 (blood oxygen) levels
  - Historical data visualization
  - Loading states and error handling

**Data Structure:**
```typescript
interface TelemetryData {
  heart: { avg_heart_rate: number; date: string }[];
  spo2: { avg_spo2: number; date: string }[];
  temperature: { avg_temp: number; date: string }[];
}
```

**Usage in:**
- `src/screens/PetProfileScreen.tsx` - Live vitals display
- `src/screens/HealthMonitoringScreen.tsx` - Comprehensive health analytics

---

## 📁 New Files Created

### `src/components/AddPetModal.tsx`
A comprehensive modal component for adding new pets with:
- Species selection from API
- Breed selection based on species
- Photo upload with expo-image-picker
- Form validation
- API error handling
- Success animation
- Real-time breed filtering

**Features:**
- Dynamic species/breed loading from API
- Image picker integration
- Horizontal scrollable selection buttons
- Gender selection
- Weight, color, and device ID fields
- Date of birth input
- Responsive design

---

## 🔧 Updated Files

### 1. `src/context/AuthContext.tsx`
- ✅ Added real API authentication
- ✅ Integrated BASE_URL from config
- ✅ Token management
- ✅ Error handling

### 2. `src/screens/LoginScreen.tsx`
- ✅ Already had good structure
- ✅ Uses AuthContext for login
- ✅ Form validation
- ✅ Loading states

### 3. `src/screens/DashboardScreen.tsx`
- ✅ Added AddPetModal integration
- ✅ Add pet button (floating + empty state)
- ✅ Modal state management

### 4. `src/screens/PetDetailsScreen.tsx`
- ✅ Already had update pet API integration
- ✅ Form editing with API calls
- ✅ Error handling

### 5. `src/screens/PetProfileScreen.tsx`
- ✅ Added telemetry API integration
- ✅ Real-time vitals from API
- ✅ Loading states
- ✅ Fallback to default values when no data
- ✅ Display latest heart rate, temperature, SpO2

### 6. `src/screens/HealthMonitoringScreen.tsx`
- ✅ Added telemetry API integration
- ✅ Dynamic pet selection from context
- ✅ Real heart rate data visualization
- ✅ Loading indicators
- ✅ Health alerts based on telemetry

---

## 📦 Dependencies Added

### expo-image-picker
```bash
npm install expo-image-picker --legacy-peer-deps
```

**Purpose:** Photo selection for pet avatars

**Permissions Added to app.json:**
- iOS: NSPhotoLibraryUsageDescription, NSCameraUsageDescription
- Android: READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, CAMERA

---

## 🔑 API Configuration

**Base URL:** `https://13.233.237.155`

**API Version:** v1

**Endpoints Configuration:** `src/config/api.ts`
```typescript
export const ENDPOINTS = {
  species: `/api/v1/pets/species/`,
  breeds: (speciesId) => `/api/v1/pets/breeds/?species_id=${speciesId}`,
  addPet: `/api/v1/pets/`,
  getPets: (ownerId) => `/api/v1/pets/?owner_id=${ownerId}`,
  updatePet: (petId, ownerId) => `/api/v1/pets/${petId}/?owner_id=${ownerId}`,
  telemetry: (deviceId) => `/api/v1/telemetry/charts/${deviceId}/`,
};
```

---

## 🎯 API Integration Summary

### Before Migration:
- ❌ No authentication API
- ❌ No add pet functionality
- ❌ No species/breeds API
- ❌ No telemetry API
- ✅ Basic pet fetching only

### After Migration:
- ✅ Full authentication with login API
- ✅ Complete pet management (add, update, fetch)
- ✅ Species and breeds selection from API
- ✅ Real-time telemetry data integration
- ✅ Health monitoring with live vitals
- ✅ Photo upload capability
- ✅ Error handling and loading states
- ✅ Offline data caching (AsyncStorage)

---

## 🚀 Testing the Integrations

### 1. Test Login
1. Open the app
2. Enter email and password
3. Click "Sign In to Dashboard"
4. Should call `/api/v1/auth/login/` and navigate to dashboard

### 2. Test Add Pet
1. Go to Dashboard
2. Click "+ Add New Pet" floating button
3. Select species (calls `/api/v1/pets/species/`)
4. Select breed (calls `/api/v1/pets/breeds/?species_id={id}`)
5. Fill in details and upload photo
6. Click "Add Pet" (calls `POST /api/v1/pets/`)

### 3. Test Telemetry
1. Navigate to a pet profile
2. Should display live vitals from `/api/v1/telemetry/charts/{deviceId}/`
3. Go to Health Monitoring screen
4. Should show heart rate chart with real data

### 4. Test Update Pet
1. Go to Pet Details screen
2. Click "Edit"
3. Modify pet information
4. Click "Save" (calls `PATCH /api/v1/pets/{petId}/`)

---

## 🔐 Authentication Flow

1. User enters credentials in LoginScreen
2. AuthContext.login() calls `/api/v1/auth/login/`
3. Token is stored in AsyncStorage
4. axiosInstance automatically includes token in requests
5. On app restart, token is loaded from AsyncStorage
6. User stays logged in until logout

---

## 📊 Data Flow

```
User Action → Screen Component → Context/API Call → axiosInstance → Backend
                                      ↓
                                  Loading State
                                      ↓
                              Success/Error Response
                                      ↓
                              Update UI State
```

---

## ✨ Features Implemented

### Core Features:
- ✅ User authentication with API
- ✅ Pet management (CRUD operations)
- ✅ Real-time health monitoring
- ✅ Telemetry data visualization
- ✅ Photo upload for pets
- ✅ Species/breed selection
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Offline token storage

### UI/UX Features:
- ✅ Modal-based add pet flow
- ✅ Floating action button
- ✅ Horizontal scrollable pickers
- ✅ Image preview
- ✅ Success animations
- ✅ Empty states
- ✅ Loading indicators

---

## 🎉 Migration Complete!

All API integrations from the web application have been successfully migrated to the mobile application with React Native Expo compatibility!
