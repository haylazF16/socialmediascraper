# Team Clock App

A cross-platform mobile application (Android + iOS) for team member clock in/out functionality built with React Native and Supabase.

## Phase 1: Project Setup ✅

This phase includes:
- React Native project setup
- Supabase integration
- Authentication (email login/signup)
- Navigation setup with Login, Signup, and Home screens

## Prerequisites

Before running this app, make sure you have the following installed:

### For React Native Development:
- Node.js (v16 or later)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### For Supabase:
- A Supabase account and project

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd TeamClockApp

# Install dependencies
npm install
```

### 2. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings
3. Copy your project URL and anon/public key
4. Update the Supabase configuration in `src/services/supabase.ts`:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Enable Email Authentication in Supabase

1. In your Supabase dashboard, go to Authentication > Settings
2. Enable "Enable email confirmations" if you want email verification
3. Configure your email templates (optional)

### 4. Running the App

#### For Android:

1. Make sure you have Android Studio installed and configured
2. Start an Android emulator or connect a physical device
3. Run the app:

```bash
# Start Metro bundler
npx react-native start

# In a new terminal, run the Android app
npx react-native run-android
```

#### For iOS (macOS only):

1. Make sure you have Xcode installed
2. Install iOS dependencies:

```bash
cd ios && pod install && cd ..
```

3. Run the app:

```bash
# Start Metro bundler
npx react-native start

# In a new terminal, run the iOS app
npx react-native run-ios
```

## Project Structure

```
TeamClockApp/
├── src/
│   ├── components/          # Reusable components
│   ├── screens/            # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── services/           # API and external services
│   │   └── supabase.ts
│   └── types/              # TypeScript type definitions
│       └── index.ts
├── App.tsx                 # Main app component
└── README.md
```

## Features Implemented (Phase 1)

### Authentication
- ✅ Email/password signup
- ✅ Email/password login
- ✅ Sign out functionality
- ✅ Authentication state management

### Navigation
- ✅ Login screen
- ✅ Signup screen
- ✅ Home screen (placeholder)
- ✅ Stack navigation with proper routing

### UI/UX
- ✅ Modern, clean design
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ Responsive layout

## Next Steps (Future Phases)

- **Phase 2**: Clock in/out functionality
- **Phase 3**: Admin dashboard
- **Phase 4**: Reports and analytics
- **Phase 5**: Push notifications

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean and rebuild with `cd android && ./gradlew clean && cd ..`
3. **iOS build issues**: Clean with `cd ios && xcodebuild clean && cd ..`

### Supabase Connection Issues

- Verify your Supabase URL and anon key are correct
- Check that your Supabase project is active
- Ensure email authentication is enabled in your Supabase dashboard

## Development Notes

- The app uses TypeScript for better type safety
- Supabase client is configured for authentication only in this phase
- Navigation is handled with React Navigation v6
- All screens are responsive and follow iOS/Android design guidelines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both Android and iOS
5. Submit a pull request

## License

This project is licensed under the MIT License.