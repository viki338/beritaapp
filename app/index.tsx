// /app/index.tsx
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, API_KEY } from '../constants/api';

export default function HomeScreen() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${BASE_URL}?lang=en&token=${API_KEY}`);
      const data = await res.json();
      setNews(data.articles);
      setFilteredNews(data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = news.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2196f3" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Search Bar */}
      <TextInput
        placeholder="Cari berita..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={{
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      />

      {/* List Berita */}
      <FlatList
        data={filteredNews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/news/[id]', params: { id: encodeURIComponent(JSON.stringify(item)) } })}
            style={{
              marginBottom: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={{ height: 200, width: '100%' }} resizeMode="cover" />
            )}
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ marginTop: 5, color: 'gray' }}>{item.source.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Berita tidak ditemukan.</Text>}
      />
    </View>
  );
}
