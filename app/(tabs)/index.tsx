import { Audio } from "expo-av";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  {
    id: "diya",
    label: "Light Diya",
    image: require("@/assets/diya.png"),
    sound: require("@/assets/diya-burn.mp3")
  },
  {
    id: "bell",
    label: "Ring Bell",
    image: require("@/assets/images/icon.png"),
    sound: require("@/assets/bell.mp3")
  },
  {
    id: "shankh",
    label: "Blow Shankh",
    image: require("@/assets/images/icon.png"),
    sound: require("@/assets/shankh.mp3")
  },
];

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  async function playSound(soundFile: any) {
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        🪔 Virtual Pooja Room
      </Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemButton}
            onPress={() => playSound(item.sound)}
          >
            <Image
              source={item.image}
              style={styles.itemImage}
              resizeMode="contain"
            />
            <Text style={styles.itemLabel}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea580c',
    marginBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  itemButton: {
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '45%',
  },
  itemImage: {
    width: 96,
    height: 96,
    marginBottom: 8,
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
  },
});
