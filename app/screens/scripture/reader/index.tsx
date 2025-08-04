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
  ImageBackground, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Breadcrumb } from '../../../../components/Breadcrumb';
import BottomNavigation from '../../../../components/BottomNavigation';
import { Images, BhagwanScroller } from '../../../data';
import { useLocalSearchParams } from "expo-router";
import { useFontSettings } from '../../../../hooks/useFontSettings';

const sampleText = {
  text: `श्रीरामचन्द्र कृपालु भजुमन, हरण भवभय दारुणम् । नव कञ्ज-लोचन कञ्ज मुख कर कञ्ज पद कञ्जारुणम्॥\n\n`,
  chapter: "Chapter 1 Arjuna's Dilemma",
  // category: category => category
}

const ScriptureReader = () => {
  const { textStyles } = useFontSettings();
  const scrollRef = useRef(null);
  const [isReading, setIsReading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [showFloatingControls, setShowFloatingControls] = useState(false);
  const currentScrollY = useRef(0); // Track current scroll position
  const { scriptureName, chapters } = useLocalSearchParams();

  const { category } = useLocalSearchParams();

  useEffect(() => {
    if (isReading) {
      Speech.speak(sampleText.text, {
        language: "hi-IN",
        onDone: () => setIsReading(false),
      });
    } else {
      Speech.stop();
    }
  }, [isReading]);

  useEffect(() => {
    let scrollAnimation;
    if (autoScroll && scrollRef.current) {
      const startContinuousScroll = () => {
        const scrollStep = () => {
          currentScrollY.current += 1; // Use ref to persist scroll position
          scrollRef.current?.scrollTo({ y: currentScrollY.current, animated: false });
          if (autoScroll) {
            scrollAnimation = requestAnimationFrame(scrollStep);
          }
        };
        scrollStep();
      };
      startContinuousScroll();
    }
    return () => {
      if (scrollAnimation) {
        cancelAnimationFrame(scrollAnimation);
      }
    };
  }, [autoScroll]);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Always update current scroll position to sync with user scroll
    currentScrollY.current = scrollY;
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
                { label: 'Scriptures', path: '/screens/scripture/menu' },
                { label: category ? String(category) : 'Reader' }
              ]}
          />
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
          <ScrollView
              ref={scrollRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
              bounces={true}
          >
            <View>
              <Text style={[styles.title, textStyles.h1]}>{category.toUpperCase()}</Text>
            </View>

            <View style={styles.bookSection}>
              <Image
                  source={Images.deity.laxmi.laxmi}
                  style={styles.bookImage}
              />
              <Text style={[styles.bookTitle, textStyles.h2]}>Bhagavad Gita</Text>
              <Text style={[styles.chapterSubtitle, textStyles.body]}>{"Chapter 1 Arjuna's Dilemma"}</Text>
            </View>

            <View style={styles.controlRow}>
              <View style={styles.switchRow}>
                <Text style={[styles.label, textStyles.body]}>🔁 Auto-Scroll</Text>
                <Switch value={autoScroll} onValueChange={setAutoScroll} />
              </View>

              <TouchableOpacity style={styles.playButton} onPress={() => setIsReading(!isReading)}>
                <Text style={[styles.playButtonText, textStyles.body]}>
                  {isReading ? "🔇 Stop Voice" : "🔊 Start Voice"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.scriptureText, textStyles.body]}>{sampleText.text.repeat(10)}</Text>
          </ScrollView>

          {/* Floating Control Panel */}
          {showFloatingControls && (
            <View style={styles.floatingControlRow}>
              <View style={styles.switchRow}>
                <Text style={[styles.floatingLabel, textStyles.body]}>🔁 Auto-Scroll</Text>
                <Switch value={autoScroll} onValueChange={setAutoScroll} />
              </View>

              <TouchableOpacity style={styles.floatingPlayButton} onPress={() => setIsReading(!isReading)}>
                <Text style={[styles.floatingPlayButtonText, textStyles.body]}>
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
  innerContainer: {
    alignItems: 'center',
        paddingHorizontal: 20,
  },
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
    paddingBottom: 80,
  },
  title: {
    // fontSize: 28, // Remove hardcoded fontSize - now using textStyles.h1
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
    // fontSize: 22, // Remove hardcoded fontSize - now using textStyles.h2
    fontWeight: 'bold',
    color: '#fde68a',
  },
  chapterSubtitle: {
    // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
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
    // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
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
    // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  scriptureText: {
    // fontSize: 18, // Remove hardcoded fontSize - now using textStyles.body
    lineHeight: 30,
    color: '#fff7ed',
    fontFamily: 'serif',
    minHeight: 1000,
  },
  floatingControlRow: {
    position: 'absolute',
    bottom: 80, // Increased from 16 to avoid overlap with bottom navigation
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
    // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
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
    // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
    fontWeight: '600',
    fontFamily: 'serif',
  },
});

export default ScriptureReader;
