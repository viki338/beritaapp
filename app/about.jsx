// /app/about.tsx
import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Newsly</Text>
      <Text style={{ textAlign: 'center', fontSize: 16 }}>
        Newsly adalah aplikasi berita sederhana yang menyajikan informasi dari berbagai sumber terpercaya. Dibuat dengan React Native & Expo.
      </Text>
    </View>
  );
}
