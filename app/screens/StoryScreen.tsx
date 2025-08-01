import * as Speech from "expo-speech";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Breadcrumb } from "../../components/Breadcrumb";
import BottomNavigation from "../../components/BottomNavigation";
import { Images } from "./../data/index";

const stories = [
  {
    id: "1",
    title: "राम का वनवास",
    text: "राजा दशरथ ने राम को वनवास भेजा। सीता और लक्ष्मण भी साथ गए...",
    image: Images["laxmi_full"],
  },
  {
    id: "2",
    title: "हनुमान और संजीवनी बूटी",
    text: "हनुमान जी ने लंका से संजीवनी बूटी लाकर लक्ष्मण की जान बचाई...",
    image: Images["laxmi_full"],
  },
];

const StoryScreen = () => {
  const [narratingId, setNarratingId] = useState(null);

  const breadcrumbItems = [
    { label: 'Home', path: '/screens/HomeScreen' },
    { label: 'Stories' }
  ];

  const handleNarration = (id, text) => {
    if (narratingId === id) {
      Speech.stop();
      setNarratingId(null);
    } else {
      Speech.stop();
      Speech.speak(text, {
        language: "hi-IN",
        onDone: () => setNarratingId(null),
      });
      setNarratingId(id);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.storyContainer}>
      <Image
        source={item.image}
        style={styles.storyImage}
        resizeMode="cover"
      />
      <Text style={styles.storyTitle}>
        {item.title}
      </Text>
      <Text style={styles.storyText}>
        {item.text}
      </Text>
      <TouchableOpacity
        style={styles.listenButton}
        onPress={() => handleNarration(item.id, item.text)}
      >
        <Text style={styles.listenButtonText}>
          {narratingId === item.id ? "🔈 Stop" : "▶️ Listen"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <Breadcrumb items={breadcrumbItems} textColor="#10b981" iconColor="#10b981" backgroundColor="rgba(16, 185, 129, 0.1)" />
        <Text style={styles.title}>
          📚 Divine Stories
        </Text>
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
      <BottomNavigation />
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
  },
  storyContainer: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 4,
  },
  storyText: {
    fontSize: 16,
    color: '#374151', // gray-700
    marginBottom: 8,
  },
  listenButton: {
    backgroundColor: '#f97316', // orange-500
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  listenButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default StoryScreen;
