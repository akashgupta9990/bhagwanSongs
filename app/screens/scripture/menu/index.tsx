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
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Breadcrumb } from "../../../../components/Breadcrumb";
import BottomNavigation from "../../../../components/BottomNavigation";
import { Images, BhagwanScroller } from '../../../data';
import { useFontSettings } from '../../../../hooks/useFontSettings';

// Custom TouchableOpacity with default activeOpacity
const TouchableOpacity = (props: any) => (
  <RNTouchableOpacity activeOpacity={0.7} {...props} />
);

// Scripture categories
const scriptures = [
    { name: 'Ramayana', icon: 'book-open' },
    { name: 'Bhagavad Gita', icon: 'book' },
    { name: 'Shiv Puran', icon: 'book-reader' },
    { name: 'Vishnu Puran', icon: 'scroll' },
    { name: 'Durga Saptashati', icon: 'file-alt' },
    { name: 'Hanuman Chalisa', icon: 'bookmark' },
];

const ScriptureCategoryScreen = () => {
    const router = useRouter();
    const { textStyles } = useFontSettings();

    const handlePress = (category: string) => {
        router.push({
            pathname: '/screens/scripture/reader',
            params: { category: category }
        });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={Images.deity.vishnu.vishnu_1}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.overlayContainer}>
                    <Breadcrumb
                        items={[
                            { label: 'Home', path: '/' },
                            { label: 'Scripture' }
                        ]}
                    />

                    {/* Top Deities Row */}
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

                    <Text style={[styles.title, textStyles.h1]}>Sacred Scriptures</Text>

                    {/* Scripture List */}
                    <View style={styles.scripturesContainer}>
                        {scriptures.map((scripture, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.scriptureButton}
                                onPress={() => handlePress(scripture.name)}
                            >
                                <FontAwesome5
                                    name={scripture.icon as any}
                                    size={24}
                                    color="#fde68a"
                                />
                                <Text style={[styles.scriptureText, textStyles.body]}>{scripture.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
            <BottomNavigation />
        </View>
    );
};

export default ScriptureCategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7c2d12', // bg-orange-900 - matching HomeScreen
    },
    innerContainer: {
        alignItems: 'center',
    },
    title: {
        // fontSize: 30, // Remove hardcoded fontSize - now using textStyles.h1
        fontWeight: 'bold',
        color: '#fde68a', // text-yellow-200 - matching HomeScreen
        marginBottom: 20, // mb-5
    },
    button: {
        backgroundColor: 'rgba(154, 52, 18, 0.3)', // semi-transparent - matching HomeScreen
        borderRadius: 16, // rounded-xl
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16, // p-4
        width: '91%', // w-11/12
        borderWidth: 2,
        borderColor: 'rgba(154, 52, 18, 0.30)', // matching HomeScreen
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
        backgroundColor: 'rgba(124, 45, 18, 0)', // lighter overlay for more visible image - matching HomeScreen
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 80, // Add padding to avoid overlap with bottom navigation
    },
    scripturesContainer: {
        width: '100%',
        paddingHorizontal: 16,
    },
    scriptureButton: {
        backgroundColor: 'rgba(154, 52, 18, 0.3)', // semi-transparent
        borderRadius: 16, // rounded-xl
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16, // p-4
        width: '100%', // Full width for list layout
        marginBottom: 12, // Space between list items
        borderWidth: 2,
        borderColor: 'rgba(154, 52, 18, 0.30)',
    },
    scriptureText: {
        color: 'white',
        // fontSize: 18, // Remove hardcoded fontSize - now using textStyles.body
        marginLeft: 16, // ml-4
    },
});
