import { useAudioPlayer } from "expo-audio";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Breadcrumb } from "../../components/Breadcrumb";
import BottomNavigation from "../../components/BottomNavigation";
import { Images } from "../data";

const items = [
  {
    id: "diya",
    label: "Light Diya",
    image: Images["deity.laxmi.laxmi"],
    // sound: require("../assets/diya-burn.mp3"), // Commented out until audio files are added
  },
  {
    id: "bell",
    label: "Ring Bell",
    image: Images["deity.laxmi.laxmi"],
    // sound: require("../assets/bell.mp3"), // Commented out until audio files are added
  },
  {
    id: "shankh",
    label: "Blow Shankh",
    image: Images["deity.laxmi.laxmi"],
    // sound: require("../assets/shankh.mp3"), // Commented out until audio files are added
  },
];

const PoojaRoomScreen = () => {
  const [audioPlayer, setAudioPlayer] = useState(null);

  const breadcrumbItems = [
    { label: 'Home', path: '/screens/HomeScreen' },
    { label: 'Pooja Room' }
  ];

  async function playSound(soundFile) {
    if (!soundFile) {
      // If no sound file is provided, just show an alert
      alert("Sound feature coming soon!");
      return;
    }

    try {
      // If there's an existing player, stop it first
      if (audioPlayer) {
        audioPlayer.pause();
      }

      // Create new audio player with the sound file
      const player = useAudioPlayer(soundFile);
      setAudioPlayer(player);
      player.play();
    } catch (error) {
      console.error('Error playing sound:', error);
      alert("Error playing sound");
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Breadcrumb items={breadcrumbItems} textColor="#8b5cf6" iconColor="#8b5cf6" backgroundColor="rgba(139, 92, 246, 0.1)" />
        <Text style={styles.header}>
          🪔 Virtual Pooja Room
        </Text>
        <View style={styles.itemsRow}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemButton}
              onPress={() => playSound(null)}
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
      <BottomNavigation />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea580c', // orange-600
    marginBottom: 16,
    marginTop: 8,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  itemButton: {
    alignItems: 'center',
    backgroundColor: '#fef3c7', // yellow-100
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    width: '45%',
    margin: 8,
    // Use Platform.select for proper shadow handling
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },
  itemImage: {
    width: 96,
    height: 96,
    marginBottom: 8,
    borderRadius: 12,
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937', // gray-800
  },
});

export default PoojaRoomScreen;
