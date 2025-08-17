import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { useFontSettings } from '../../../hooks/useFontSettings';
import { Images } from '../../data';
import { signUp } from "./../../../authService";

const SignUpScreen = () => {
    const { textStyles } = useFontSettings();
    const { login } = useAuth();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [agreeToTerms, setAgreeToTerms] = React.useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignUp = async () => {
        // Validation
        if (!fullName.trim()) {
            Alert.alert('Missing Information', 'Please enter your full name.');
            return;
        }

        if (!email.trim()) {
            Alert.alert('Missing Information', 'Please enter your email address.');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        if (!password.trim()) {
            Alert.alert('Missing Information', 'Please enter a password.');
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert(
                'Weak Password',
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
            return;
        }

        if (!agreeToTerms) {
            Alert.alert('Terms Required', 'Please agree to the Terms of Service and Privacy Policy.');
            return;
        }

        setIsLoading(true);
        try {
            await signUp(email, password, name);
            // navigation.navigate("Home");
        } catch (e) {
            throw new Error(e.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
        // try {
        //     // Add your signup API call here
        //     const response = await fetch('https://your-api-endpoint.com/signup', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             fullName: fullName.trim(),
        //             email: email.toLowerCase().trim(),
        //             password: password,
        //         }),
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         // Store user data using auth context
        //         await login(data.user, data.token);
        //         Alert.alert('Welcome!', 'Account created successfully. Welcome to BhaktiPath!');
        //     } else {
        //         const errorData = await response.json();
        //         throw new Error(errorData.message || 'Failed to create account');
        //     }
        // } catch (error) {
        //     console.error('SignUp error:', error);
        //     Alert.alert('Sign Up Failed', 'Unable to create account. Please try again.');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleTermsPress = () => {
        Alert.alert(
            'Terms & Privacy',
            'By creating an account, you agree to our Terms of Service and Privacy Policy.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'I Agree', onPress: () => setAgreeToTerms(true) }
            ]
        );
    };

    const facebookLogin = () => {
        // 9 — Test flow in development

// Ensure your Facebook app is in Development mode and your Facebook account is a Tester (or Admin).

// Run your Expo app (npx expo start) and open it in Expo Go on your phone.

// Tap Login with Facebook → complete the flow → Firebase should sign you in.

// If you see redirect/URI mismatches, re-check the Valid OAuth Redirect URIs in Facebook and that the Expo redirect URI exactly matches your username & slug.

// 10 — Production steps (when you want to publish)

// Add Privacy Policy URL, Terms of Service, and Contact Email (Settings → Basic). Facebook may require these to make your app public.

// If only email + public_profile are used, you can switch the app to Live without App Review.

// If you requested other scopes, submit for App Review with screencast and justification.

// When building eventual stand-alone apps (EAS build), add Android package name / iOS bundle ID into Facebook settings under Facebook Login → Settings (Android/iOS sections) if you plan to use native OAuth redirects.

        // The expo auth proxy handles redirect URI behind the scenes — that’s why you must add https://auth.expo.io/@<username>/<slug> to Facebook valid URIs

        // import React, { useEffect } from 'react';
        // import { Button } from 'react-native';
        // import * as Facebook from 'expo-auth-session/providers/facebook';
        // import { getAuth, signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
        // import { initializeApp } from 'firebase/app';

        // // --- initialize firebase (if not already) ---
        // const firebaseConfig = { /* paste your config */ };
        // const app = initializeApp(firebaseConfig);
        // const auth = getAuth(app);

        // // --- component ---
        // export default function FacebookLogin() {
        // // Initialize request with your Facebook App ID
        // const [request, response, promptAsync] = Facebook.useAuthRequest({
        //     clientId: '<YOUR_FACEBOOK_APP_ID>', // replace with your Facebook App ID
        //     // redirectUri: makeRedirectUri({ useProxy: true }) // expo uses default proxy
        // });

        // useEffect(() => {
        //     if (response?.type === 'success') {
        //     const { authentication } = response;
        //     const fbAccessToken = authentication.accessToken;
        //     const credential = FacebookAuthProvider.credential(fbAccessToken);

        //     // Sign in to Firebase with the Facebook credential
        //     signInWithCredential(auth, credential)
        //         .then(userCred => {
        //         // user is signed in
        //         console.log('Firebase user:', userCred.user);
        //         // Optionally save profile to Firestore here
        //         })
        //         .catch(err => {
        //         console.error('Firebase signInWithCredential error', err);
        //         });
        //     }
        // }, [response]);

        // return (
        //     <Button
        //     disabled={!request}
        //     title="Login with Facebook"
        //     onPress={() => promptAsync()}
        //     />
        // );
        // }

    };

    console.log("signup screen")

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ImageBackground
                source={Images.deity.ram.ramSita}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* App Title */}
                    <View style={styles.headerContainer}>
                        <Text style={[styles.appTitle, textStyles.h1]}>🕉️ BhaktiPath</Text>
                        <Text style={[styles.subtitle, textStyles.body]}>
                            Begin Your Spiritual Journey
                        </Text>
                    </View>

                    {/* Sign Up Form */}
                    <View style={styles.formContainer}>
                        <Text style={[styles.formTitle, textStyles.h2]}>Create Account</Text>

                        {/* Full Name Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#fde68a" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.textInput, textStyles.body]}
                                placeholder="Full Name"
                                placeholderTextColor="#9ca3af"
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#fde68a" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.textInput, textStyles.body]}
                                placeholder="Email Address"
                                placeholderTextColor="#9ca3af"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#fde68a" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.textInput, textStyles.body]}
                                placeholder="Password"
                                placeholderTextColor="#9ca3af"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.passwordToggle}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#fde68a"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#fde68a" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.textInput, textStyles.body]}
                                placeholder="Confirm Password"
                                placeholderTextColor="#9ca3af"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.passwordToggle}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#fde68a"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Terms Agreement */}
                        <TouchableOpacity
                            style={styles.termsContainer}
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                        >
                            <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                                {agreeToTerms && (
                                    <Ionicons name="checkmark" size={16} color="#7c2d12" />
                                )}
                            </View>
                            <Text style={[styles.termsText, textStyles.small]}>
                                I agree to the{' '}
                                <Text style={styles.termsLink} onPress={handleTermsPress}>
                                    Terms of Service
                                </Text>
                                {' '}and{' '}
                                <Text style={styles.termsLink} onPress={handleTermsPress}>
                                    Privacy Policy
                                </Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
                            onPress={handleSignUp}
                            disabled={isLoading}
                        >
                            <Text style={[styles.signUpButtonText, textStyles.body]}>
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={[styles.dividerText, textStyles.small]}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Social Sign Up Options */}
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color="#fde68a" />
                            <Text style={[styles.socialButtonText, textStyles.body]}>Sign up with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} onPress={() => facebookLogin()}>
                            <Ionicons name="logo-facebook" size={20} color="#fde68a" />
                            <Text style={[styles.socialButtonText, textStyles.body]}>Sign up with Facebook</Text>
                        </TouchableOpacity>

                        {/* Sign In Link */}
                        <View style={styles.signInContainer}>
                            <Text style={[styles.signInText, textStyles.small]}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={[styles.signInLink, textStyles.small]}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7c2d12',
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fde68a',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    subtitle: {
        color: '#fcd34d',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'italic',
    },
    formContainer: {
        backgroundColor: 'rgba(124, 45, 18, 0.9)',
        borderRadius: 20,
        padding: 24,
        borderWidth: 2,
        borderColor: 'rgba(253, 230, 138, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fde68a',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(154, 52, 18, 0.3)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(253, 230, 138, 0.3)',
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 12,
    },
    passwordToggle: {
        padding: 8,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#fde68a',
        backgroundColor: 'transparent',
        marginRight: 12,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#fde68a',
    },
    termsText: {
        flex: 1,
        color: '#fcd34d',
        fontSize: 14,
        lineHeight: 20,
    },
    termsLink: {
        color: '#fde68a',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    signUpButton: {
        backgroundColor: '#9a3412',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fde68a',
        marginBottom: 20,
    },
    signUpButtonDisabled: {
        opacity: 0.6,
    },
    signUpButtonText: {
        color: '#fde68a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(253, 230, 138, 0.3)',
    },
    dividerText: {
        color: '#fcd34d',
        paddingHorizontal: 16,
        fontSize: 14,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(154, 52, 18, 0.3)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(253, 230, 138, 0.3)',
        paddingVertical: 12,
        marginBottom: 12,
    },
    socialButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 12,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signInText: {
        color: '#fcd34d',
        fontSize: 14,
    },
    signInLink: {
        color: '#fde68a',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
