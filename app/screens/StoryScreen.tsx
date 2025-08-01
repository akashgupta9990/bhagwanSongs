import { useNavigation } from '@react-navigation/native';
import * as Speech from "expo-speech";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stories = [
  {
    id: "1",
    title: "राम का वनवास",
    text: "राजा दशरथ ने राम को वनवास भेजा। सीता और लक्ष्मण भी साथ गए...",
    image: require("../../assets/images/New folder/laxmi_full.png"),
  },
  {
    id: "2",
    title: "हनुमान और संजीवनी बूटी",
    text: "हनुमान जी ने लंका से संजीवनी बूटी लाकर लक्ष्मण की जान बचाई...",
    image: require("../../assets/images/New folder/laxmi_full.png"),
  },
];

const StoryScreen = () => {
  const navigation = useNavigation();
  const [narratingId, setNarratingId] = useState(null);

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
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      {/* Breadcrumb */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={{ color: '#9a3412', fontWeight: 'bold', fontSize: 14 }}>Home</Text>
        </TouchableOpacity>
        <Text style={{ color: '#9a3412', fontSize: 14 }}>  {'>'}  </Text>
        <Text style={{ color: '#9a3412', fontWeight: 'bold', fontSize: 14 }}>Stories</Text>
      </View>
      <Text className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-4">
        📚 Divine Stories
      </Text>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
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
