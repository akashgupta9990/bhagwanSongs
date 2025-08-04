import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ImageBackground, TouchableOpacity as RNTouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Breadcrumb } from '../../components/Breadcrumb';
import BottomNavigation from '../../components/BottomNavigation';
import { Images, BhagwanScroller } from '../data';
import { useFontSettings } from '../../hooks/useFontSettings';

// Custom TouchableOpacity with default activeOpacity
const TouchableOpacity = (props: any) => (
  <RNTouchableOpacity activeOpacity={0.7} {...props} />
);

export default function HomeScreen() {
  const router = useRouter();
  const { textStyles } = useFontSettings();

  const breadcrumbItems = [
    { label: 'Home' }
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.deity.ram.ramSita}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.overlayContainer}>
          <Breadcrumb items={breadcrumbItems} />
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
                          marginLeft: 6,
                          marginRight: 6,
                        }}
                    />
                ))}
              </ScrollView>
            </View>

            {/* Title */}
            <Text style={[styles.title, textStyles.h1]}>Bhakti Path</Text>

            {/* Buttons */}
            <TouchableOpacity
              style={[styles.button, { marginBottom: 12 }]}
              onPress={() => router.push('/screens/audio/audio-menu')}
            >
              <Ionicons name="headset" size={24} color="white" />
              <Text style={[styles.buttonText, textStyles.body]}>Audio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginBottom: 12 }]}
              onPress={() => router.push('/screens/scripture/menu')}
            >
              <FontAwesome5 name="book" size={24} color="white" />
              <Text style={[styles.buttonText, textStyles.body]}>Scripture</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { marginBottom: 24 }]}
                onPress={() => router.push('/screens/PoojaRoomScreen')}
            >
              <MaterialCommunityIcons name="script-text-outline" size={24} color="white" />
              <Text style={[styles.buttonText, textStyles.body]}>Virtual Pooja Room</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { marginBottom: 24 }]}
                onPress={() => router.push('/screens/setting/menu')}
            >
              <MaterialCommunityIcons name="script-text-outline" size={24} color="white" />
              <Text style={[styles.buttonText, textStyles.body]}>Setting</Text>
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
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c2d12', // bg-orange-900
  },
  innerContainer: {
    alignItems: 'center'
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
    bottom: 100, // Increased from 40 to avoid overlap with bottom navigation
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
    paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
  },
});
