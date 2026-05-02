# Ktinoskare - Proactive Pet & Animal Care Platform

**Know before they show** 🐾

Ktinoskare is an innovative pet and animal care management platform designed to empower pet owners with proactive, data-driven insights. Transform animal healthcare from reactive to proactive with advanced monitoring, GPS tracking, and health analytics.

## 🎯 Vision

We envision a future where animal healthcare is proactive, precise, and accessible—revolutionizing how pet and farm owners care for their animals.

## ✨ Key Features

- **🔍 Pet Safety & Geo-Fencing**: Advanced GPS tracking with geo-fencing technology to keep your pet safe within designated areas
- **💚 Health Monitoring**: Real-time health monitoring with vital data tracking to prevent potential issues before they arise
- **📊 Data-Driven Insights**: Intelligent analytics providing comprehensive data about your pet's activity, nutrition, and wellbeing
- **🎯 Holistic Pet Care**: Track activity levels, nutrition, playtime, and overall wellness in one seamless dashboard
- **👥 Multi-Pet Management**: Manage multiple pets with personalized profiles and health records
- **⚙️ User Settings**: Customize your experience with flexible preferences and notification settings

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API Communication**: Axios
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Linting**: ESLint

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Landing page hero section
│   ├── About.tsx       # About section
│   ├── PracticeAreas.tsx  # Key features showcase
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication
│   ├── PetProfile.tsx  # Pet profiles
│   ├── PetDetails.tsx  # Detailed pet information
│   ├── GpsTracking.tsx # GPS tracking page
│   ├── HealthMonitoring.tsx  # Health monitoring
│   ├── UserList.tsx    # User management
│   └── Settings.tsx    # User settings
├── context/            # React Context for state management
│   ├── AuthContext.tsx # Authentication state
│   └── PetsContext.tsx # Pets data management
├── config/             # Configuration files
│   ├── api.ts         # API configuration
│   └── axiosInstance.ts # Axios setup
├── data/              # Static data
│   └── pets.ts        # Pet data
├── App.tsx            # Root component
└── main.tsx           # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ktinos_fe
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with necessary API endpoints and configuration.

### Development

Start the development server with HMR (Hot Module Replacement):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔐 Authentication

The app uses context-based authentication via `AuthContext`. Users can log in and manage their session securely.

## 🐕 Pet Management

Pets are managed through `PetsContext` which provides global state management for pet data across the application.

## 🎨 Styling

The application uses Tailwind CSS for responsive design and custom theme configuration. See `tailwind.config.js` and `theme.ts` for customization options.

## 📚 Additional Configuration

- **TypeScript**: See `tsconfig.json` and `tsconfig.app.json`
- **Vite**: See `vite.config.ts`
- **PostCSS**: See `postcss.config.js`
- **ESLint**: See `eslint.config.js`

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and conventions.

## 📄 License

This project is proprietary and confidential.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
