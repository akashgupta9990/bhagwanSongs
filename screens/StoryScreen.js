import * as Speech from "expo-speech";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stories = [
  {
    id: "1",
    title: "राम का वनवास",
    text: "राजा दशरथ ने राम को वनवास भेजा। सीता और लक्ष्मण भी साथ गए...",
    image: require("../assets/story-ramvanvas.jpg"),
  },
  {
    id: "2",
    title: "हनुमान और संजीवनी बूटी",
    text: "हनुमान जी ने लंका से संजीवनी बूटी लाकर लक्ष्मण की जान बचाई...",
    image: require("../assets/story-hanuman.jpg"),
  },
];

const StoryScreen = () => {
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
    <View className="bg-white dark:bg-neutral-900 mb-4 p-4 rounded-xl shadow">
      <Image
        source={item.image}
        className="w-full h-40 rounded-lg mb-3"
        resizeMode="cover"
      />
      <Text className="text-xl font-bold text-gray-800 dark:text-white mb-1">
        {item.title}
      </Text>
      <Text className="text-base text-gray-700 dark:text-gray-300 mb-2">
        {item.text}
      </Text>
      <TouchableOpacity
        className="bg-orange-500 px-4 py-2 rounded-full self-start"
        onPress={() => handleNarration(item.id, item.text)}
      >
        <Text className="text-white font-medium">
          {narratingId === item.id ? "🔈 Stop" : "▶️ Listen"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
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

export default StoryScreen;
