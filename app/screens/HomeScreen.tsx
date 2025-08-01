import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ImageBackground, TouchableOpacity as RNTouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Images } from '../data';
// Custom TouchableOpacity with default activeOpacity
const TouchableOpacity = (props: any) => (
  <RNTouchableOpacity activeOpacity={0.7} {...props} />
);

export default function HomeScreen() {
  const router = useRouter();

  return (
   <ImageBackground
    source={Images["ramSita_1"]}
    style={styles.backgroundImage}
    resizeMode="cover"
  >
    <ScrollView contentContainerStyle={styles.overlayContainer}>
      <View style={styles.innerContainer}>
        {/* Top Avatars */}
        <View style={styles.avatarRow}>
          {['ram_1', 'shiv_1', 'laxmi_1', 'durga_1', 'saraswati_1'].map((name, idx) => (
            <Image
              key={idx}
              source={Images[name]}
              style={styles.avatar}
            />
          ))}
        </View>

        {/* Title */}
        <Text style={styles.title}>Bhakti Path</Text>

        {/* Buttons */}

        <TouchableOpacity
          style={[styles.button, { marginBottom: 12 }]}
          onPress={() => router.push({ pathname: './audio/audio-player' })}
        >
          <Ionicons name="headset" size={24} color="white" />
          <Text style={styles.buttonText}>Audio</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.button, { marginBottom: 12 }]}
          onPress={() => router.push({ pathname: './scriptures-screen' })}
        >
          <FontAwesome5 name="book" size={24} color="white" />
          <Text style={styles.buttonText}>Scripture Reader</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.button, { marginBottom: 24 }]}
          onPress={() => router.push({ pathname: './story-screen' })}
        >
          <MaterialCommunityIcons name="script-text-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Stories</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Microphone Button */}
      <TouchableOpacity
        style={styles.micButton}
        onPress={() => console.log('Voice Input Coming Soon!')}
      >
        <Ionicons name="mic" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c2d12', // bg-orange-900
  },
  innerContainer: {
    alignItems: 'center',
    paddingTop: 40, // pt-10
  },
  avatarRow: {
    flexDirection: 'row',
    marginBottom: 20, // mb-5
    justifyContent: 'center',
  },
  avatar: {
    width: 56, // w-14
    height: 56, // h-14
    borderRadius: 28, // rounded-full
    borderWidth: 2,
    borderColor: '#f59e42', // border-yellow-500
    marginHorizontal: 6, // space-x-3
  },
  title: {
    fontSize: 30, // text-3xl
    fontWeight: 'bold',
    color: '#fde68a', // text-yellow-200
    marginBottom: 20, // mb-5
  },
  centerImage: {
    width: 256, // w-64
    height: 256, // h-64
    marginBottom: 24, // mb-6
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 24,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(154, 52, 18, 0.3)', // semi-transparent
    borderRadius: 16, // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // p-4
    width: '91%', // w-11/12
    borderWidth: 2,
    borderColor: 'rgba(154, 52, 18, 0.30)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // text-lg
    marginLeft: 16, // ml-4
  },
  micButton: {
    position: 'absolute',
    bottom: 40, // bottom-10
    right: 20, // right-5
    backgroundColor: '#c2410c', // bg-orange-700
    padding: 16, // p-4
    borderRadius: 9999, // rounded-full
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlayContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(124, 45, 18, 0)', // lighter overlay for more visible image
    alignItems: 'center',
    paddingTop: 40,
  },
});
