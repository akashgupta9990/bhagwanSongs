import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const bhajans = [
  {
    id: "1",
    title: "Ram Raksha Stotra",
    artist: "Anuradha Paudwal",
    image: require("../assets/ramraksha.jpg"),
  },
  {
    id: "2",
    title: "Shiv Tandav Stotram",
    artist: "Ravindra Sathe",
    image: require("../assets/shivtandav.jpg"),
  },
  {
    id: "3",
    title: "Hanuman Chalisa",
    artist: "Hariharan",
    image: require("../assets/hanuman.jpg"),
  },
];

const BhajanPlayerScreen = () => {
  const [playingId, setPlayingId] = useState(null);

  const renderItem = ({ item }) => {
    const isPlaying = item.id === playingId;

    return (
      <TouchableOpacity
        className="flex-row items-center p-3 mb-3 bg-white dark:bg-neutral-900 rounded-xl shadow"
        onPress={() => setPlayingId(isPlaying ? null : item.id)}
      >
        <Image
          source={item.image}
          className="w-16 h-16 rounded-lg mr-4"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-300">
            {item.artist}
          </Text>
        </View>
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={32}
          color={isPlaying ? "#f97316" : "#6b7280"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4 py-2">
      <Text className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-4">
        🎧 Devotional Bhajans
      </Text>
      <FlatList
        data={bhajans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BhajanPlayerScreen;
