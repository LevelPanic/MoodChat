import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// Required for Expo Auth Session
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Authentication
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '890937683469-4afu5m0n4s7r9qg5f7l28hv9d03k8e5g.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@muhtasham/moodchat', // Replace with your redirect URI
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleLogin(authentication?.accessToken);
    } else if (response?.type === 'error') {
      Alert.alert('Authentication Error', 'Failed to login with Google.');
    }
  }, [response]);

  const handleGoogleLogin = async (accessToken: string | undefined) => {
    setIsLoading(true);
    try {
      // Simulate backend login process
      const userInfo = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ).then((res) => res.json());

      // Handle user info or pass it to your backend
      Alert.alert('Login Successful', `Welcome, ${userInfo.name}!`);
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'Unable to fetch user info.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MoodChat</Text>
      <Text style={styles.subtitle}>Organize your life with ease</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => promptAsync()}
        disabled={!request || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign in with Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718', // Dark mode background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ECEDEE', // Light text color for dark mode
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9BA1A6', // Icon color for dark mode
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7F5AF0', // Tint color for dark mode
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ECEDEE', // Light text color for contrast
  },
});
