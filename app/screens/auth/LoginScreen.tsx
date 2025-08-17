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
import { loginNew } from "./../../../authService";

const LoginScreen = () => {
    const { textStyles } = useFontSettings();
    const { login } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Missing Information', 'Please enter both email and password.');
            return;
        }

        setIsLoading(true);
        try {
            // Add your login API call here
            // const response = await fetch('https://your-api-endpoint.com/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email: email.toLowerCase().trim(),
            //         password: password,
            //     }),
            // });

            // if (response.ok) {
            //     const data = await response.json();
            //     // Store user data using auth context
            //     await login(data.user, data.token);
            //     Alert.alert('Welcome!', 'Login successful');
            // } else {
            //     throw new Error('Invalid credentials');
            // }
            await loginNew(email, password);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        Alert.alert(
            'Reset Password',
            'Please enter your email address to receive reset instructions.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Send Reset Email', onPress: () => {
                    // Add forgot password logic here
                    Alert.alert('Email Sent', 'Password reset instructions have been sent to your email.');
                }}
            ]
        );
    };

    const handleGuestLogin = async () => {
        try {
            // Create a guest user session
            const guestUser = {
                id: 'guest_' + Date.now(),
                email: 'guest@bhaktipath.com',
                name: 'Guest User'
            };
            await login(guestUser, 'guest_token');
        } catch (error) {
            console.error('Guest login error:', error);
            Alert.alert('Error', 'Failed to continue as guest. Please try again.');
        }
    };

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
                            Connect with the Divine
                        </Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        <Text style={[styles.formTitle, textStyles.h2]}>Welcome Back</Text>

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

                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
                            <Text style={[styles.forgotText, textStyles.small]}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text style={[styles.loginButtonText, textStyles.body]}>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={[styles.dividerText, textStyles.small]}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Social Login Options */}
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color="#fde68a" />
                            <Text style={[styles.socialButtonText, textStyles.body]}>Continue with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-facebook" size={20} color="#fde68a" />
                            <Text style={[styles.socialButtonText, textStyles.body]}>Continue with Facebook</Text>
                        </TouchableOpacity>

                        {/* Sign Up Link */}
                        <View style={styles.signUpContainer}>
                            <Text style={[styles.signUpText, textStyles.small]}>{"Don't have an account?"}</Text>
                            <TouchableOpacity onPress={() => router.push('screens/auth/SignUpScreen')}>
                                <Text style={[styles.signUpLink, textStyles.small]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Guest Access */}
                        <TouchableOpacity
                            style={styles.guestButton}
                            onPress={handleGuestLogin}
                        >
                            <Text style={[styles.guestButtonText, textStyles.body]}>Continue as Guest</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

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
    forgotContainer: {
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        color: '#fde68a',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    loginButton: {
        backgroundColor: '#9a3412',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fde68a',
        marginBottom: 20,
    },
    loginButtonDisabled: {
        opacity: 0.6,
    },
    loginButtonText: {
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    signUpText: {
        color: '#fcd34d',
        fontSize: 14,
    },
    signUpLink: {
        color: '#fde68a',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    guestButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    guestButtonText: {
        color: '#fcd34d',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
