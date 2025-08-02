import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions
} from 'react-native';
import { useAudioPlayer, AudioSource } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';

import { BhagwanScroller, Bhajans, Images } from '../../../data';
import { Breadcrumb } from "../../../../components/Breadcrumb";
import BottomNavigation from "../../../../components/BottomNavigation";

// Custom TouchableOpacity with default activeOpacity
const TouchableOpacity = (props: any) => (
  <RNTouchableOpacity activeOpacity={0.7} {...props} />
);

const PlayerScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const sliderRef = useRef<View>(null);

  const currentBhajan = Bhajans[currentIndex];
  const player = useAudioPlayer(currentBhajan.audio as AudioSource);

  useEffect(() => {
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      setIsPlaying(status.playing ?? false);
      setDuration(status.duration ?? 0);
      setPosition(status.currentTime ?? 0);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  useEffect(() => {
    // Load new audio when current index changes
    if (currentBhajan.audio) {
      player.replace(currentBhajan.audio as AudioSource);
    }
  }, [currentIndex, player, currentBhajan.audio]);

  const togglePlayPause = async () => {
    try {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
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

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const handleSeek = (event: any) => {
    if (sliderRef.current) {
      sliderRef.current.measure((x, y, width, height, pageX, pageY) => {
        const { locationX } = event.nativeEvent;
        const newPosition = (locationX / width) * duration;
        player.seekTo(newPosition);
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.deity.ram.ramSita}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.overlayContainer}>
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Audio', path: '/screens/audio/audio-menu' },
              { label: 'Player' }
            ]}
          />

          <View style={styles.innerContainer}>
            {/* Top Avatars */}
            <View style={{ height: 80, marginBottom: 20, width: Dimensions.get('window').width, paddingHorizontal: 6 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
              >
                {BhagwanScroller.map((name, idx) => (
                  <Image
                    key={idx}
                    source={Images.icon[name]}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      borderWidth: 2,
                      borderColor: '#f59e42',
                      marginHorizontal: 6,
                    }}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>

            {/* Album Art */}
            <View style={styles.albumArtContainer}>
              <Image source={currentBhajan.image} style={styles.albumArt} resizeMode="contain" />
            </View>

            {/* Song Info */}
            <Text style={styles.songTitle}>{currentBhajan.title}</Text>
            <Text style={styles.artistName}>{currentBhajan.artist}</Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{formatMillis(position * 1000)}</Text>
              <TouchableOpacity
                ref={sliderRef}
                style={styles.sliderContainer}
                onPress={handleSeek}
                activeOpacity={1}
              >
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: duration > 0 ? `${(position / duration) * 100}%` : '0%' }
                    ]}
                  />
                  <View
                    style={[
                      styles.progressThumb,
                      {
                        left: duration > 0 ? `${(position / duration) * 100}%` : '0%',
                        transform: [{ translateX: -8 }]
                      }
                    ]}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.timeText}>{formatMillis(duration * 1000)}</Text>
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
            {showPlaylist && (
              <View style={styles.playlistContainer}>
                <Text style={styles.playlistTitle}>Playlist</Text>
                {Bhajans.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.playlistItem,
                      index === currentIndex && styles.activePlaylistItem
                    ]}
                    onPress={() => setCurrentIndex(index)}
                  >
                    <Image source={item.image} style={styles.playlistImage} resizeMode="cover" />
                    <View style={styles.playlistInfo}>
                      <Text style={styles.playlistItemTitle}>{item.title}</Text>
                      <Text style={styles.playlistArtist}>{item.artist}</Text>
                    </View>
                    {index === currentIndex && (
                      <Ionicons name="musical-notes" size={20} color="#f59e42" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.pullHandleContainer}>
          <TouchableOpacity style={styles.pullHandle} onPress={togglePlaylist}>
            <Ionicons
              name={showPlaylist ? "chevron-down" : "chevron-up"}
              color="#fff"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlayContainer: {
    flexGrow: 1,
    paddingTop: 10, // Small top padding instead of centering
    paddingBottom: 80, // Avoid overlap with bottom navigation
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  albumArt: {
    width: 250,
    height: 250,
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
    paddingHorizontal: 5,
  },
  timeText: {
    color: '#FFF5E1',
    fontSize: 14,
    width: 45,
    textAlign: 'center',
    fontWeight: '500',
  },
  sliderContainer: {
    flex: 1,
    height: 40,
    marginHorizontal: 15,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    position: 'relative',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e42',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#f59e42',
    position: 'absolute',
    top: -6,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
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
  playlistContainer: {
    width: '100%',
  },
  playlistTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '500',
    marginBottom: 10,
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
  playlistItemTitle: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '500',
  },
  playlistArtist: {
    fontSize: 14,
    color: '#FFF5E1',
  },
  pullHandleContainer: {
    position: 'absolute',
    bottom: 70, // adjust depending on your bottom nav height
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pullHandle: {
    backgroundColor: '#8B4513', // dark saffron or brownish to match your theme
    borderRadius: 25,
    padding: 8,
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)', // Updated for web compatibility
    elevation: 5,
  },
});

export default PlayerScreen;
