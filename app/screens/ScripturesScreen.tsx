import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Breadcrumb } from '../../components/Breadcrumb';
import BottomNavigation from '../../components/BottomNavigation';
import { Images, BhagwanScroller } from '../data';

const sampleText = `
श्रीरामचन्द्र कृपालु भजुमन, हरण भवभय दारुणम् ।\n
नव कञ्ज-लोचन कञ्ज मुख कर कञ्ज पद कञ्जारुणम् ॥
`;

const ScripturesScreen = () => {
  const scrollRef = useRef(null);
  const [isReading, setIsReading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showFloatingControls, setShowFloatingControls] = useState(false);

  useEffect(() => {
    if (isReading) {
      Speech.speak(sampleText, {
        language: "hi-IN",
        onDone: () => setIsReading(false),
      });
    } else {
      Speech.stop();
    }
  }, [isReading]);

  useEffect(() => {
    let scrollTimer;
    if (autoScroll && scrollRef.current) {
      scrollTimer = setInterval(() => {
        scrollRef.current.scrollTo({ y: 1000, animated: true });
      }, 8000);
    }
    return () => clearInterval(scrollTimer);
  }, [autoScroll]);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Show floating controls when scrolled past the original controls (approximately 300px)
    setShowFloatingControls(scrollY > 300);
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
          source={Images["bg_lotus"]}
          style={styles.background}
          resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <Breadcrumb
              items={[
                { label: 'Home', path: '/screens/HomeScreen' },
                { label: 'Scriptures' }
              ]}
          />
          <ScrollView
              ref={scrollRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
          >
            <View style={styles.deityRow}>
              {BhagwanScroller.map((name, index) => (
                  <Image key={index} source={Images[name]} style={styles.deityIcon} />
              ))}
            </View>

            <Text style={styles.title}>SCRIPTURE</Text>

            <View style={styles.bookSection}>
              <Image
                  source={Images["deity.laxmi.laxmi"]}
                  style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>Bhagavad Gita</Text>
              <Text style={styles.chapterSubtitle}>Chapter 1 · Arjuna's Dilemma</Text>
            </View>

            <View style={styles.controlRow}>
              <View style={styles.switchRow}>
                <Text style={styles.label}>🔁 Auto-Scroll</Text>
                <Switch value={autoScroll} onValueChange={setAutoScroll} />
              </View>

              <TouchableOpacity style={styles.playButton} onPress={() => setIsReading(!isReading)}>
                <Text style={styles.playButtonText}>
                  {isReading ? "🔇 Stop Voice" : "🔊 Start Voice"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.scriptureText}>{sampleText.repeat(10)}</Text>
          </ScrollView>

          {/* Floating Control Panel */}
          {showFloatingControls && (
            <View style={styles.floatingControlRow}>
              <View style={styles.switchRow}>
                <Text style={styles.floatingLabel}>🔁 Auto-Scroll</Text>
                <Switch value={autoScroll} onValueChange={setAutoScroll} />
              </View>

              <TouchableOpacity style={styles.floatingPlayButton} onPress={() => setIsReading(!isReading)}>
                <Text style={styles.floatingPlayButtonText}>
                  {isReading ? "🔇 Stop Voice" : "🔊 Start Voice"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#7c2d12', // deep orange-red
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
  },
  deityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    marginTop: 4,
  },
  deityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#e2b714',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fcd34d',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  bookSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bookImage: {
    width: 180,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fde68a',
  },
  chapterSubtitle: {
    fontSize: 16,
    color: '#facc15',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#fef3c7',
    fontSize: 16,
    marginRight: 8,
  },
  playButton: {
    backgroundColor: '#f97316',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Add extra bottom padding when floating controls are visible
  },
  scriptureText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#fff7ed',
    fontFamily: 'serif',
  },
  floatingControlRow: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 45, 18, 0.5)', // deep reddish-orange
    borderColor: 'rgb(105 19 3)', // golden border
    borderWidth: 2,
    padding: 12,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  floatingLabel: {
    color: '#fde68a',
    fontSize: 16,
    fontFamily: 'serif',
    marginRight: 8,
    fontWeight: '600',
  },
  floatingPlayButton: {
    backgroundColor: '#f97316',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  floatingPlayButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default ScripturesScreen;
