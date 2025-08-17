import { Stack } from 'expo-router';
import { FontProvider } from '../hooks/useFontSettings';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FontProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="screens/auth/SignUpScreen" />
          <Stack.Screen name="screens/audio/audio-menu/index" />
          <Stack.Screen name="screens/audio/audio-player/index" />
          <Stack.Screen name="screens/scripture/menu/index" />
          <Stack.Screen name="screens/scripture/reader/index" />
          <Stack.Screen name="screens/setting/menu/index" />
          <Stack.Screen name="PoojaRoomScreen" />
        </Stack>
      </FontProvider>
    </AuthProvider>
  );
}
