# Quick Setup Guide

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon/public key
5. Update `src/services/supabase.ts` with your credentials:

```typescript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-anon-key-here';
```

## 2. Enable Authentication

1. In your Supabase dashboard, go to Authentication > Settings
2. Make sure "Enable email confirmations" is configured as desired
3. You can disable email confirmation for testing by setting it to "No confirmation required"

## 3. Run the App

### Android:
```bash
npx react-native run-android
```

### iOS:
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## 4. Test the App

1. Open the app
2. Create a new account using the signup screen
3. Sign in with your credentials
4. You should see the home screen with a sign out button

## Troubleshooting

- If you get build errors, try clearing the cache: `npx react-native start --reset-cache`
- Make sure your Supabase project is active and not paused
- Check that email authentication is enabled in your Supabase dashboard