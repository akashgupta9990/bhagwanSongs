import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bhajans } from "../../../data";

const PlayerScreen = () => {
  const [playingId, setPlayingId] = useState(null);

  const renderItem = ({ item }) => {
    const isPlaying = item.id === playingId;

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isPlaying && styles.itemContainerPlaying
        ]}
        onPress={() => setPlayingId(isPlaying ? null : item.id)}
      >
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemArtist}>{item.artist}</Text>
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🎧 Devotional Bhajans</Text>
      <FlatList
        data={Bhajans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea580c', // orange-600
    marginBottom: 16,
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainerPlaying: {
    backgroundColor: '#ffedd5', // light orange highlight
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937', // gray-900
    marginBottom: 4,
  },
  itemArtist: {
    fontSize: 14,
    color: '#6b7280', // gray-600
  },
});

export default PlayerScreen;
