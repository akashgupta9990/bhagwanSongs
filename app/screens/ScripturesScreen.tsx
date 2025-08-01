import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleText = `
श्रीरामचन्द्र कृपालु भजुमन, हरण भवभय दारुणम् ।\n
नव कञ्ज-लोचन कञ्ज मुख कर कञ्ज पद कञ्जारुणम् ॥
`;

const ScripturesScreen = () => {
  const scrollRef = useRef(null);
  const [isReading, setIsReading] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📖 Ramayan Paath</Text>

      <View style={styles.topRow}>
        <View style={styles.autoScrollRow}>
          <Text style={styles.autoScrollText}>🔁 Auto-Scroll</Text>
          <Switch value={autoScroll} onValueChange={setAutoScroll} />
        </View>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => setIsReading(!isReading)}
        >
          <Text style={styles.voiceButtonText}>
            {isReading ? "Stop Voice" : "Start Voice"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.scriptureText}>
          {sampleText.repeat(10)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ea580c', // orange-600
    marginBottom: 8,
    marginTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  autoScrollRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoScrollText: {
    color: '#1f2937', // gray-800
    fontSize: 16,
    marginRight: 8,
  },
  voiceButton: {
    backgroundColor: '#f97316', // orange-500
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  voiceButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  scrollView: {
    backgroundColor: '#fef3c7', // yellow-50
    borderRadius: 16,
    marginTop: 8,
  },
  scrollContent: {
    padding: 16,
  },
  scriptureText: {
    fontSize: 18,
    color: '#111827', // gray-900
    lineHeight: 28,
  },
});

export default ScripturesScreen;
