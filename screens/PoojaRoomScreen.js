import { Audio } from "expo-av";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  {
    id: "diya",
    label: "Light Diya",
    image: require("../assets/images/icon.png"),
    // sound: require("../assets/diya-burn.mp3"), // Commented out until audio files are added
  },
  {
    id: "bell",
    label: "Ring Bell",
    image: require("../assets/images/icon.png"),
    // sound: require("../assets/bell.mp3"), // Commented out until audio files are added
  },
  {
    id: "shankh",
    label: "Blow Shankh",
    image: require("../assets/images/icon.png"),
    // sound: require("../assets/shankh.mp3"), // Commented out until audio files are added
  },
];

const PoojaRoomScreen = () => {
  const [sound, setSound] = useState(null);

  async function playSound(soundFile) {
    if (!soundFile) {
      // If no sound file is provided, just show an alert
      alert("Sound feature coming soon!");
      return;
    }
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
    setSound(newSound);
    await newSound.playAsync();
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black items-center justify-center px-4">
      <Text className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-4">
        🪔 Virtual Pooja Room
      </Text>
      <View className="flex-row flex-wrap justify-center gap-6">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="items-center bg-yellow-100 dark:bg-yellow-900 p-4 rounded-xl shadow-md w-[45%]"
            onPress={() => playSound(item.sound)}
          >
            <Image
              source={item.image}
              className="w-24 h-24 mb-2"
              resizeMode="contain"
            />
            <Text className="text-lg font-medium text-gray-800 dark:text-white">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PoojaRoomScreen;
