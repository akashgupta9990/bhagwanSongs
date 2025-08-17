import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../app/screens/auth/LoginScreen';

interface AuthWrapperProps {
  children: React.ReactNode;
  navigation?: any;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, navigation }) => {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fde68a" />
      </View>
    );
  }

  // If user is not logged in, show login screen
  if (!user) {
    return <LoginScreen navigation={navigation} />;
  }

  // If user is authenticated, show the protected content
  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c2d12',
  },
});

export default AuthWrapper;
