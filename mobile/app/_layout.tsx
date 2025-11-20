import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProviderVPJS } from '../contexts/AuthContextVPJS';

export default function RootLayout() {
  return (
    <AuthProviderVPJS>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="sensores" />
        <Stack.Screen name="atuadores" />
        <Stack.Screen name="sobre-nos" />
      </Stack>
    </AuthProviderVPJS>
  );
}
