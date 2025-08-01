import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

import { BhagwanScroller, Bhajans, Images } from '../../../data';
import { Breadcrumb } from "../../../../components/Breadcrumb";
import BottomNavigation from "../../../../components/BottomNavigation";

const PlayerScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const currentBhajan = Bhajans[currentIndex];

  useEffect(() => {
    loadAndPlay(currentBhajan.audio);
    return () => {
      unloadSound();
    };
  }, [currentIndex]);

  const unloadSound = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current.setOnPlaybackStatusUpdate(null);
      soundRef.current = null;
    }
  };

  const loadAndPlay = async (audioUri: string) => {
    try {
      await unloadSound();
      const { sound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true },
          onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    } else {
      // Optionally handle error status
      console.warn('Playback status error:', status);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Bhajans.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Bhajans.length) % Bhajans.length);
  };

  const formatMillis = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <Breadcrumb
            items={[
              { label: 'Home', path: '/screens/HomeScreen' },
              { label: 'Audio Player' }
            ]}
        />

        {/* Deity Icons Row */}
        <View style={styles.deityRow}>
          {BhagwanScroller.map((name, index) => (
            <Image key={index} source={Images[name]} style={styles.deityIcon} />
          ))}
        </View>

        {/* Album Art */}
        <View style={styles.albumArtContainer}>
          <Image source={Images[currentBhajan.image]} style={styles.albumArt} />
        </View>

        {/* Song Info */}
        <Text style={styles.songTitle}>{currentBhajan.title}</Text>
        <Text style={styles.artistName}>{currentBhajan.artist}</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{formatMillis(position)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={async (value) => {
              if (soundRef.current) {
                await soundRef.current.setPositionAsync(value);
              }
            }}
            minimumTrackTintColor="#f59e42"
            maximumTrackTintColor="#d1d5db"
            thumbTintColor="#FFA500"
          />
          <Text style={styles.timeText}>{formatMillis(duration)}</Text>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={handlePrevious} style={styles.controlButton}>
            <Ionicons name="play-skip-back" size={32} color="#f59e42" />
          </TouchableOpacity>

          <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={40}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
            <Ionicons name="play-skip-forward" size={32} color="#f59e42" />
          </TouchableOpacity>
        </View>

        {/* Playlist */}
        <FlatList
          data={Bhajans}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.playlistItem,
                index === currentIndex && styles.activePlaylistItem
              ]}
              onPress={() => setCurrentIndex(index)}
            >
              <Image source={Images[item.image]} style={styles.playlistImage} />
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.playlistArtist}>{item.artist}</Text>
              </View>
              {index === currentIndex && (
                <Ionicons name="musical-notes" size={20} color="#f59e42" />
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.playlistContent}
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
    backgroundColor: '#7c2d12',
    paddingHorizontal: 20,
    paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
  },
  deityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 6,
  },
  deityIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  albumArt: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  songTitle: {
    fontSize: 22,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  artistName: {
    fontSize: 16,
    color: '#FFF5E1',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    color: '#FFF5E1',
    fontSize: 14,
    width: 40,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6b4226',
  },
  activePlaylistItem: {
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '500',
  },
  playlistArtist: {
    fontSize: 14,
    color: '#FFF5E1',
  },
  playlistContent: {
    paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
  },
});

export default PlayerScreen;