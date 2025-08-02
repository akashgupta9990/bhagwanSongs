import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity as RNTouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Breadcrumb } from "../../../../components/Breadcrumb";
import BottomNavigation from "../../../../components/BottomNavigation";
import { Images, BhagwanScroller } from '../../../data';

// Custom TouchableOpacity with default activeOpacity
const TouchableOpacity = (props: any) => (
  <RNTouchableOpacity activeOpacity={0.7} {...props} />
);

const categories = [
    { name: 'Aarti', icon: 'fire' },
    { name: 'Bhajan', icon: 'music' },
    { name: 'Slokas', icon: 'book-open' },
    { name: 'Mantras', icon: 'om' },
    { name: 'Kirtan', icon: 'guitar' },
    { name: 'Pravachan', icon: 'microphone' },
];

const AudioCategoryScreen = () => {
    const router = useRouter();

    const handlePress = (category: string) => {
        // Navigate to audio player with category
        router.push('/screens/audio/audio-player');
        switch (category) {
            case 'Aarti':
                console.log('Playing Aarti...');
                break;
            case 'Bhajan':
                console.log('Playing Bhajan...');
                break;
            case 'Slokas':
                console.log('Playing Slokas...');
                break;
            case 'Mantras':
                console.log('Playing Mantras...');
                break;
            case 'Kirtan':
                console.log('Playing Kirtan...');
                break;
            case 'Pravachan':
                console.log('Playing Pravachan...');
                break;
            default:
                console.warn('Unhandled category:', category);
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
                            { label: 'Audio Categories' }
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
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>Choose Your Devotion</Text>

                        {/* Category Buttons */}
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={category.name}
                                style={[styles.button, { marginBottom: 12 }]}
                                onPress={() => handlePress(category.name)}
                            >
                                <FontAwesome5 name={category.icon} size={24} color="white" />
                                <Text style={styles.buttonText}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
            <BottomNavigation />
        </View>
    );
};

export default AudioCategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7c2d12', // bg-orange-900
    },
    innerContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30, // text-3xl
        fontWeight: 'bold',
        color: '#fde68a', // text-yellow-200
        marginBottom: 20, // mb-5
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
