# Ktinoskare Mobile - React Native Expo

This is the mobile application version of Ktinoskare, migrated from React web to React Native with Expo.

## 🚀 Features Migrated

- ✅ **Authentication** - Login/Logout with AsyncStorage persistence
- ✅ **Dashboard** - Pet health overview with stats and alerts
- ✅ **GPS Tracking** - Live location tracking with geofencing
- ✅ **Health Monitoring** - Activity charts, sleep monitoring, vitals
- ✅ **Pet Management** - View, edit, and manage pet profiles
- ✅ **Settings** - Account preferences, alerts, and security
- ✅ **API Integration** - Full axios integration with backend
- ✅ **Context API** - Auth and Pets state management
- ✅ **Navigation** - Bottom tabs + stack navigation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## 🏗️ Project Structure

```
ktinos_mobile/
├── src/
│   ├── config/          # API configuration and axios instance
│   ├── context/         # Auth and Pets context providers
│   ├── data/            # Pet data types and mock data
│   ├── navigation/      # React Navigation setup
│   ├── screens/         # All application screens
│   └── theme.ts         # Design tokens and theme
├── App.tsx              # Root component
├── app.json             # Expo configuration
└── package.json
```

## 📱 Screens

1. **LoginScreen** - Email/password authentication
2. **DashboardScreen** - Main overview with pet cards and stats
3. **GpsTrackingScreen** - Live map with location tracking
4. **HealthMonitoringScreen** - Vitals, activity, and sleep charts
5. **PetProfileScreen** - Individual pet health vitals
6. **PetDetailsScreen** - Edit pet information
7. **UserListScreen** - List/card view of all pets
8. **SettingsScreen** - Account and app preferences

## 🎨 Design

The mobile app maintains the same design system as the web version:

- **Primary Color**: Deep Purple (#6A1B9A)
- **Accent Colors**: Health Green, Teal Wellness, Soft Lavender
- **Typography**: System fonts (iOS San Francisco, Android Roboto)
- **Components**: Custom-styled React Native components

## 🔗 API Integration

The app connects to the same backend API as the web version:
- Base URL: `https://13.233.237.155/api/v1`
- Endpoints: Species, Breeds, Pets, Telemetry

## 🔐 Authentication

Mock authentication with AsyncStorage. Replace with real API integration:
- Login credentials stored locally
- Token persistence across app restarts
- Protected route navigation

## 📝 Notes

- All web functionality has been adapted for mobile
- Responsive design for different screen sizes
- Native gestures and animations
- Optimized for iOS and Android
- Can also run on web via Expo

## 🛠️ Technologies

- React Native 0.86
- Expo SDK ~57
- React Navigation 7
- Axios for HTTP requests
- AsyncStorage for persistence
- TypeScript for type safety

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Update API_URL in `src/config/api.ts` if needed
3. Configure push notifications (optional)
4. Add real authentication flow
5. Test on physical devices
6. Build for production

## 📄 License

Same as the main Ktinoskare project.
