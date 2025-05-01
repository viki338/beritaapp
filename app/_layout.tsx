// /app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2196f3' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    />
  );
}
