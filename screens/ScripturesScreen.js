import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView className="flex-1 bg-white dark:bg-black px-4">
      <Text className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-2">
        📖 Ramayan Paath
      </Text>

      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <Text className="text-gray-800 dark:text-white">🔁 Auto-Scroll</Text>
          <Switch value={autoScroll} onValueChange={setAutoScroll} />
        </View>
        <TouchableOpacity
          className="bg-orange-500 px-4 py-2 rounded-full"
          onPress={() => setIsReading(!isReading)}
        >
          <Text className="text-white font-semibold">
            {isReading ? "Stop Voice" : "Start Voice"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-xl"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-lg leading-8 text-gray-900 dark:text-white">
          {sampleText.repeat(10)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScripturesScreen;
