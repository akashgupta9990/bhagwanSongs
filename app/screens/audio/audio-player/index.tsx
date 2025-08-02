import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform,
  Modal
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
  const [showModal, setShowModal] = useState(false);
  const sliderRef = useRef<View>(null);
  const intervalRef = useRef<number | null>(null);

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
      // Reset playing state when changing songs
      setIsPlaying(false);
    }
  }, [currentIndex, player, currentBhajan.audio]);

  const togglePlayPause = async () => {
    try {
      if (isPlaying) {
        await player.pause();
        setIsPlaying(false); // Manually set state
      } else {
        await player.play();
        setIsPlaying(true); // Manually set state
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

  const handleSeek = (event: any) => {
    if (duration > 0) {
      // Get the touch coordinates - handle both native and web events
      const locationX = event.nativeEvent.locationX ?? event.nativeEvent.offsetX ?? event.nativeEvent.clientX;

      if (sliderRef.current) {
        sliderRef.current.measure((fx, fy, width, height, px, py) => {
          // For web, if locationX is still undefined, calculate from clientX and element position
          let adjustedLocationX = locationX;

          if (adjustedLocationX === undefined && event.nativeEvent.clientX !== undefined) {
            // Get the slider's position on the page
            const rect = (sliderRef.current as any)?.getBoundingClientRect?.();
            if (rect) {
              adjustedLocationX = event.nativeEvent.clientX - rect.left;
            }
          }

          // Ensure we have valid values before calculating
          if (width > 0 && adjustedLocationX !== undefined && adjustedLocationX >= 0 && adjustedLocationX <= width) {
            const percentage = Math.max(0, Math.min(1, adjustedLocationX / width));
            const newPosition = percentage * duration;

            // Ensure the new position is valid
            if (isFinite(newPosition) && newPosition >= 0 && newPosition <= duration) {
              // Update position immediately for visual feedback
              setPosition(newPosition);

              // Seek to the new position
              try {
                player.seekTo(newPosition);
              } catch (error) {
                console.error('Error seeking to position:', error);
              }
            }
          }
        });
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Add effect to manage progress updates with a more reliable timer
  useEffect(() => {
    let animationFrame: number | null = null;

    if (isPlaying) {
      const updateProgress = async () => {
        try {
          // Get current position and duration directly from player
          const currentPos = player.currentTime;
          const totalDuration = player.duration;

          if (currentPos !== undefined && currentPos !== null) {
            setPosition(currentPos);
          }
          if (totalDuration !== undefined && totalDuration !== null && totalDuration > 0) {
            setDuration(totalDuration);
          }

          // Continue updating if still playing
          if (isPlaying) {
            animationFrame = requestAnimationFrame(updateProgress);
          }
        } catch (error) {
          // Silent error handling for progress updates
        }
      };

      updateProgress();
    }

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPlaying, player]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.bg.bg}
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
              <Image source={currentBhajan.image} style={styles.albumArt} resizeMode="cover" />
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

            {/* Playlist Button */}
            <TouchableOpacity onPress={openModal} style={styles.playlistButton}>
              <Ionicons name="list" size={24} color="#f59e42" />
              <Text style={styles.playlistButtonText}> Playlist</Text>
            </TouchableOpacity>

            {/* Playlist Modal */}
            <Modal
              visible={showModal}
              animationType="slide"
              transparent={true}
              onRequestClose={closeModal}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={closeModal}
              >
                <TouchableOpacity
                  style={styles.modalContent}
                  activeOpacity={1}
                  onPress={(e) => e.stopPropagation()}
                >
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Playlist</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.playlistScroll}>
                    {Bhajans.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.playlistItem,
                          index === currentIndex && styles.activePlaylistItem
                        ]}
                        onPress={() => {
                          setCurrentIndex(index);
                          closeModal();
                        }}
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
                  </ScrollView>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </View>
        </ScrollView>
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
    width: 300,
    height: 300,
    borderRadius: 150, // Half of width/height to make it perfectly circular
    opacity: 0.9, // Add opacity for a nice visual effect
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
    elevation: 5,
    // Use Platform.select for proper shadow handling
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.4)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
    }),
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
  playlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  playlistButtonText: {
    color: '#f59e42',
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1e1e2e',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  playlistScroll: {
    maxHeight: 400,
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
    elevation: 5,
    // Use Platform.select for proper shadow handling
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
});

export default PlayerScreen;
