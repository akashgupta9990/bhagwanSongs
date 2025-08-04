import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Switch,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Modal,
    PanResponder
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Images } from '../../../data';
import BottomNavigation from '../../../../components/BottomNavigation';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { useFontSettings } from '../../../../hooks/useFontSettings';
import { fontSizeOptions, fontStyleOptions } from '../../../../utils/fontSettings';
import { useFocusEffect } from '@react-navigation/native';

const SettingsScreen = () => {
    const { textStyles, refreshFontSettings } = useFontSettings();
    const [sleepTimer, setSleepTimer] = React.useState(0); // 0-30 minutes
    const [fontSize, setFontSize] = React.useState('medium');
    const [fontStyle, setFontStyle] = React.useState('default');
    const [primaryLanguage, setPrimaryLanguage] = React.useState(false);
    const [homeImage, setHomeImage] = React.useState(false);
    const [notificationAudio, setNotificationAudio] = React.useState(false);
    const [showFontSizeModal, setShowFontSizeModal] = React.useState(false);
    const [showFontStyleModal, setShowFontStyleModal] = React.useState(false);
    const sliderRef = React.useRef(null);
    const timerIntervalRef = React.useRef(null);
    const isResetRef = React.useRef(false); // Track if settings were just reset

    React.useEffect(() => {
        const loadSettings = async () => {
            try {
                const sleepTimerValue = await AsyncStorage.getItem('sleepTimer');
                const fontSizeValue = await AsyncStorage.getItem('fontSize');
                const fontStyleValue = await AsyncStorage.getItem('fontStyle');
                const primaryLanguageValue = await AsyncStorage.getItem('primaryLanguage');
                const homeImageValue = await AsyncStorage.getItem('homeImage');
                const notificationAudioValue = await AsyncStorage.getItem('notificationAudio');

                if (sleepTimerValue !== null) setSleepTimer(parseInt(sleepTimerValue, 10) || 0);
                if (fontSizeValue !== null) setFontSize(fontSizeValue);
                if (fontStyleValue !== null) setFontStyle(fontStyleValue);
                if (primaryLanguageValue !== null) setPrimaryLanguage(JSON.parse(primaryLanguageValue));
                if (homeImageValue !== null) setHomeImage(JSON.parse(homeImageValue));
                if (notificationAudioValue !== null) setNotificationAudio(JSON.parse(notificationAudioValue));
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    // Reload settings when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            const loadSettingsOnFocus = async () => {
                try {
                    // Only reload non-timer settings to avoid disrupting countdown
                    const fontSizeValue = await AsyncStorage.getItem('fontSize');
                    const fontStyleValue = await AsyncStorage.getItem('fontStyle');
                    const primaryLanguageValue = await AsyncStorage.getItem('primaryLanguage');
                    const homeImageValue = await AsyncStorage.getItem('homeImage');
                    const notificationAudioValue = await AsyncStorage.getItem('notificationAudio');

                    // Check if settings were reset and timer should be synced
                    if (isResetRef.current) {
                        const sleepTimerValue = await AsyncStorage.getItem('sleepTimer');
                        if (sleepTimerValue === null) {
                            setSleepTimer(0);
                        }
                        isResetRef.current = false; // Reset the flag
                    }

                    if (fontSizeValue !== null) setFontSize(fontSizeValue);
                    if (fontStyleValue !== null) setFontStyle(fontStyleValue);
                    if (primaryLanguageValue !== null) setPrimaryLanguage(JSON.parse(primaryLanguageValue));
                    if (homeImageValue !== null) setHomeImage(JSON.parse(homeImageValue));
                    if (notificationAudioValue !== null) setNotificationAudio(JSON.parse(notificationAudioValue));
                } catch (error) {
                    console.error('Error loading settings on focus:', error);
                }
            };

            loadSettingsOnFocus();
        }, [])
    );

    React.useEffect(() => {
        const saveSettings = async () => {
            try {
                // Only save timer if it's greater than 0, otherwise remove it
                if (sleepTimer > 0) {
                    await AsyncStorage.setItem('sleepTimer', sleepTimer.toString());
                } else {
                    await AsyncStorage.removeItem('sleepTimer');
                }

                await AsyncStorage.setItem('fontSize', fontSize);
                await AsyncStorage.setItem('fontStyle', fontStyle);
                await AsyncStorage.setItem('primaryLanguage', JSON.stringify(primaryLanguage));
                await AsyncStorage.setItem('homeImage', JSON.stringify(homeImage));
                await AsyncStorage.setItem('notificationAudio', JSON.stringify(notificationAudio));
            } catch (error) {
                console.error('Error saving settings:', error);
            }
        };

        saveSettings();
    }, [sleepTimer, fontSize, fontStyle, primaryLanguage, homeImage, notificationAudio]);

    // Sleep Timer Countdown Effect
    React.useEffect(() => {
        if (sleepTimer > 0) {
            timerIntervalRef.current = setInterval(() => {
                setSleepTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        // Timer reached 0, clear interval
                        if (timerIntervalRef.current) {
                            clearInterval(timerIntervalRef.current);
                            timerIntervalRef.current = null;
                        }
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000); // 1000ms = 1 second
        } else {
            // Clear interval if timer is 0
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        }

        // Cleanup function
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, [sleepTimer]);

    const handleFontSizeSelect = async (size) => {
        try {
            // Save to AsyncStorage first
            await AsyncStorage.setItem('fontSize', size);
            // Then update local state
            setFontSize(size);
            // Close modal
            setShowFontSizeModal(false);
            // Finally refresh global font settings
            await refreshFontSettings();
        } catch (error) {
            console.error('Error saving font size:', error);
        }
    };

    const handleFontStyleSelect = async (style) => {
        try {
            // Save to AsyncStorage first
            await AsyncStorage.setItem('fontStyle', style);
            // Then update local state
            setFontStyle(style);
            // Close modal
            setShowFontStyleModal(false);
            // Finally refresh global font settings
            await refreshFontSettings();
        } catch (error) {
            console.error('Error saving font style:', error);
        }
    };

    const handleResetSettings = async () => {
        try {
            // Clear the timer interval first
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }

            // Set the reset flag before clearing storage
            isResetRef.current = true;

            // Clear AsyncStorage first to prevent race conditions
            await AsyncStorage.multiRemove([
                'sleepTimer',
                'fontSize',
                'fontStyle',
                'primaryLanguage',
                'homeImage',
                'notificationAudio'
            ]);

            // Then reset all settings to default values
            setSleepTimer(0);
            setFontSize('medium');
            setFontStyle('default');
            setPrimaryLanguage(false);
            setHomeImage(false);
            setNotificationAudio(false);

            // Refresh global font settings to default
            await refreshFontSettings();
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    };

    const getCurrentFontSizeLabel = () => {
        const option = fontSizeOptions.find(opt => opt.value === fontSize);
        return option ? option.label : 'Medium';
    };

    const getCurrentFontStyleLabel = () => {
        const option = fontStyleOptions.find(opt => opt.value === fontStyle);
        return option ? option.label : 'Default';
    };

    const getSleepTimerDisplay = () => {
        const totalMinutes = Math.floor(sleepTimer / 60);
        const seconds = sleepTimer % 60;
        return `${totalMinutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const renderFontSizeModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showFontSizeModal}
            onRequestClose={() => setShowFontSizeModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, textStyles.title]}>Select Font Size</Text>
                    <ScrollView style={styles.optionsList}>
                        {fontSizeOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.modalOption,
                                    fontSize === option.value && styles.selectedOption
                                ]}
                                onPress={() => handleFontSizeSelect(option.value)}
                            >
                                <Text style={[
                                    styles.modalOptionText,
                                    { fontSize: option.size, fontFamily: textStyles.body.fontFamily },
                                    fontSize === option.value && styles.selectedOptionText
                                ]}>
                                    {option.label} ({option.size}px)
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => setShowFontSizeModal(false)}
                    >
                        <Text style={[styles.modalCloseButtonText, textStyles.body]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderFontStyleModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showFontStyleModal}
            onRequestClose={() => setShowFontStyleModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitle, textStyles.title]}>Select Font Style</Text>
                    <ScrollView style={styles.optionsList}>
                        {fontStyleOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.modalOption,
                                    fontStyle === option.value && styles.selectedOption
                                ]}
                                onPress={() => handleFontStyleSelect(option.value)}
                            >
                                <Text style={[
                                    styles.modalOptionText,
                                    textStyles.body,
                                    { fontFamily: option.fontFamily },
                                    fontStyle === option.value && styles.selectedOptionText
                                ]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => setShowFontStyleModal(false)}
                    >
                        <Text style={[styles.modalCloseButtonText, textStyles.body]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    // Shared function to calculate timer value from touch position
    const calculateTimerFromTouch = (pageX) => {
        if (sliderRef.current) {
            sliderRef.current.measure((x, y, width, height, pageXOffset, pageYOffset) => {
                const relativeX = pageX - pageXOffset;
                const percentage = Math.max(0, Math.min(1, relativeX / width));
                const rawValue = percentage * 30; // Maps 0-1 to 0-30 minutes
                const newValue = Math.max(0, Math.min(30, Math.round(rawValue)));
                setSleepTimer(newValue * 60); // Convert minutes to seconds
            });
        }
    };

    // PanResponder for drag functionality
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                calculateTimerFromTouch(evt.nativeEvent.pageX);
            },
            onPanResponderMove: (evt) => {
                calculateTimerFromTouch(evt.nativeEvent.pageX);
            },
            onPanResponderRelease: (evt) => {
                calculateTimerFromTouch(evt.nativeEvent.pageX);
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <ImageBackground
                source={Images.deity.ram.ramSita}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Breadcrumb
                    items={[
                        { label: 'Home', path: '/' },
                        { label: 'Settings' }
                    ]}
                />

                <Text style={[styles.header, textStyles.h1]}>Settings</Text>

                {/* Audio */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, textStyles.h3]}>Audio</Text>
                    <View style={styles.optionRow}>
                        <View style={styles.sleepTimerContainer}>
                            <Text style={[styles.optionText, textStyles.body]}>Sleep Timer</Text>
                            <Text style={[styles.sleepTimerValue, textStyles.small]}>{getSleepTimerDisplay()}</Text>
                            <View style={styles.sliderContainer}>
                                <View
                                    style={styles.sliderTrack}
                                    ref={sliderRef}
                                    onLayout={(event) => {
                                        const { width } = event.nativeEvent.layout;
                                        console.log(`Slider width measured: ${width}px`);
                                    }}
                                    {...panResponder.panHandlers}
                                >
                                    <View style={[styles.sliderFill, { width: `${2 + ((sleepTimer / 60) / 30) * 96}%` }]} />
                                    <View
                                        style={[styles.sliderThumb, { left: `${2 + ((sleepTimer / 60) / 30) * 96}%` }]}
                                    />
                                </View>
                                <View style={styles.discreteSliderZones}>
                                    {[0, 5, 10, 15, 20, 25, 30].map((minutes) => (
                                        <TouchableOpacity
                                            key={minutes}
                                            style={styles.discreteZone}
                                            onPress={() => {
                                                console.log(`Setting timer to ${minutes} minutes`);
                                                setSleepTimer(minutes * 60); // Convert minutes to seconds
                                            }}
                                        >
                                            <Text style={styles.discreteZoneText}>{minutes}m</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Scripture */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, textStyles.h3]}>Scripture</Text>
                    <TouchableOpacity style={styles.optionRow} onPress={() => setShowFontSizeModal(true)}>
                        <Ionicons name="text-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Font Size</Text>
                        <Text style={[styles.optionValue, textStyles.small]}>{getCurrentFontSizeLabel()}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fde68a" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow} onPress={() => setShowFontStyleModal(true)}>
                        <FontAwesome5 name="font" size={20} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Font Style</Text>
                        <Text style={[styles.optionValue, textStyles.small]}>{getCurrentFontStyleLabel()}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#fde68a" />
                    </TouchableOpacity>
                </View>

                {/* Language */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, textStyles.h3]}>Language</Text>
                    <TouchableOpacity style={styles.optionRow} onPress={() => setPrimaryLanguage(!primaryLanguage)}>
                        <Ionicons name="language-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Primary Language</Text>
                        <Switch value={primaryLanguage} onValueChange={setPrimaryLanguage} />
                    </TouchableOpacity>
                </View>

                {/* Customization */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, textStyles.h3]}>Customization</Text>
                    <TouchableOpacity style={styles.optionRow} onPress={() => setHomeImage(!homeImage)}>
                        <Ionicons name="image-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Home Screen Image</Text>
                        <Switch value={homeImage} onValueChange={setHomeImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow} onPress={() => setNotificationAudio(!notificationAudio)}>
                        <Ionicons name="notifications-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Notification Audio</Text>
                        <Switch value={notificationAudio} onValueChange={setNotificationAudio} />
                    </TouchableOpacity>
                </View>

                {/* Feedback */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, textStyles.h3]}>Feedback</Text>
                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="star-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Rate App</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="mail-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow}>
                        <Ionicons name="alert-circle-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Report / Suggestion</Text>
                    </TouchableOpacity>
                </View>

                {/* Donation */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, textStyles.h3]}>Support</Text>
                    <TouchableOpacity style={styles.optionRow}>
                        <MaterialCommunityIcons name="hand-heart" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Donate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionRow}>
                        <MaterialCommunityIcons name="crown-outline" size={22} color="#fde68a" />
                        <Text style={[styles.optionText, textStyles.body]}>Premium Subscription</Text>
                    </TouchableOpacity>
                </View>

                {/* Reset Settings Button */}
                <View style={styles.resetButtonContainer}>
                    <TouchableOpacity style={styles.resetButton} onPress={handleResetSettings}>
                        <Text style={styles.resetButtonText}>Reset Settings</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </ImageBackground>
            <BottomNavigation />

            {/* Modals */}
            {renderFontSizeModal()}
            {renderFontStyleModal()}
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7c2d12',
    },
    scrollContent: {
        paddingTop: 40,
        paddingBottom: 80,
        paddingHorizontal: 16,
    },
    header: {
        // fontSize: 28, // Remove hardcoded fontSize - now using textStyles.h1
        fontWeight: 'bold',
        color: '#fde68a',
        marginBottom: 16,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        // fontSize: 20, // Remove hardcoded fontSize - now using textStyles.h2
        color: '#fcd34d',
        fontWeight: '600',
        marginBottom: 12,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(154, 52, 18, 0.3)',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderWidth: 2,
        borderColor: 'rgba(154, 52, 18, 0.30)',
    },
    optionText: {
        flex: 1,
        color: 'white',
        // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
        marginLeft: 12,
    },
    optionValue: {
        color: '#fde68a',
        // fontSize: 14, // Remove hardcoded fontSize - now using textStyles.small
        marginRight: 8,
        fontWeight: '500',
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#7c2d12',
        borderRadius: 16,
        padding: 20,
        width: '85%',
        maxHeight: '70%',
        borderWidth: 2,
        borderColor: '#fde68a',
    },
    modalTitle: {
        // fontSize: 22, // Remove hardcoded fontSize - now using textStyles.title
        fontWeight: 'bold',
        color: '#fde68a',
        textAlign: 'center',
        marginBottom: 20,
    },
    optionsList: {
        maxHeight: 300,
    },
    modalOption: {
        backgroundColor: 'rgba(154, 52, 18, 0.3)',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(154, 52, 18, 0.5)',
    },
    selectedOption: {
        backgroundColor: 'rgba(253, 230, 138, 0.2)',
        borderColor: '#fde68a',
        borderWidth: 2,
    },
    modalOptionText: {
        color: 'white',
        // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
        textAlign: 'center',
    },
    selectedOptionText: {
        color: '#fde68a',
        fontWeight: 'bold',
    },
    modalCloseButton: {
        backgroundColor: '#9a3412',
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#fde68a',
    },
    modalCloseButtonText: {
        color: '#fde68a',
        // fontSize: 16, // Remove hardcoded fontSize - now using textStyles.body
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Reset Settings Button Styles
    resetButtonContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: '#9a3412',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: '#fde68a',
    },
    resetButtonText: {
        color: '#fde68a',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Sleep Timer Slider Styles
    sleepTimerContainer: {
        flex: 1,
        marginLeft: 12,
    },
    sleepTimerValue: {
        color: '#fde68a',
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'right',
    },
    sliderContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
    },
    sliderTrack: {
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(253, 230, 138, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 8,
        justifyContent: 'center',
    },
    sliderFill: {
        height: 4,
        backgroundColor: '#fde68a',
        position: 'absolute',
        top: 8,
        left: 0,
        borderRadius: 2,
    },
    sliderThumb: {
        width: 16,
        height: 16,
        backgroundColor: '#9a3412',
        borderRadius: 8,
        position: 'absolute',
        top: 2,
        marginLeft: -8,
        borderWidth: 2,
        borderColor: '#fde68a',
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    sliderLabel: {
        color: 'white',
        fontSize: 12,
    },
    discreteSliderZones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    discreteZone: {
        flex: 1,
        alignItems: 'center',
    },
    discreteZoneText: {
        color: 'white',
        fontSize: 14,
    },
    sliderButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderButton: {
        backgroundColor: 'rgba(154, 52, 18, 0.3)',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: 'rgba(154, 52, 18, 0.5)',
    },
    sliderButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sliderClickZones: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderZone: {
        flex: 1,
        height: '100%',
    },
});
