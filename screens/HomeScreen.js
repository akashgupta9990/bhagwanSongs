import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-orange-900">
      <View className="items-center pt-10">
        {/* Top Avatars */}
        <View className="flex-row space-x-3 mb-5">
          {['ram', 'shiv', 'lakshmi', 'durga', 'saraswati'].map((name, idx) => (
            <Image
              key={idx}
              source={{ uri: `https://placehold.co/60x60?text=${name}` }} // Replace with actual image URLs
              className="w-14 h-14 rounded-full border-2 border-yellow-500"
            />
          ))}
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-yellow-200 mb-5">Bhakti Path</Text>

        {/* Center Image */}
        <Image
          source={require('../assets/ram_sita.png')} // use your local asset here
          className="w-64 h-64 mb-6"
          resizeMode="contain"
        />

        {/* Buttons */}
        <TouchableOpacity
          className="bg-orange-800 rounded-xl flex-row items-center p-4 mb-3 w-11/12"
          onPress={() => navigation.navigate('Audio')}
        >
          <Ionicons name="headset" size={24} color="white" />
          <Text className="text-white text-lg ml-4">Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-orange-800 rounded-xl flex-row items-center p-4 mb-3 w-11/12"
          onPress={() => navigation.navigate('Scripture')}
        >
          <FontAwesome5 name="book" size={24} color="white" />
          <Text className="text-white text-lg ml-4">Scripture Reader</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-orange-800 rounded-xl flex-row items-center p-4 mb-6 w-11/12"
          onPress={() => navigation.navigate('Stories')}
        >
          <MaterialCommunityIcons name="script-text-outline" size={24} color="white" />
          <Text className="text-white text-lg ml-4">Stories</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Microphone Button */}
      <TouchableOpacity
        className="absolute bottom-10 right-5 bg-orange-700 p-4 rounded-full shadow-lg"
        onPress={() => console.log('Voice Input Coming Soon!')}
      >
        <Ionicons name="mic" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}
