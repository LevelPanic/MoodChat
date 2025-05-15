import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID =
  '890937683469-uupuki0duoceipnrrhvncn2celmnaan5.apps.googleusercontent.com';
const CLIENT_ID_BASE = CLIENT_ID.replace('.apps.googleusercontent.com', '');
const SCHEME = `com.googleusercontent.apps.${CLIENT_ID_BASE}`;

const REDIRECT_URI = AuthSession.makeRedirectUri({
  native: `${SCHEME}:/oauth2redirect`, // exactly one colon + one slash
});

const scopes = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/calendar',
];

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function SignInScreen() {
  const { reset } = useLocalSearchParams<{ reset?: string }>();
  
  const [loading, setLoading] = useState(false);

  const [request, , promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: scopes,
      extraParams: { prompt: 'consent', access_type: 'offline' },
    },
    discovery
  );

  useFocusEffect(() => {
    if (reset) {
      setLoading(false)
    }
  })

  useEffect(() => {
    if (request?.codeVerifier) {
      SecureStore.setItemAsync('pkce_code_verifier', request.codeVerifier);
    }
  }, [request]);

  const handlePress = async () => {
    if (!request) return;
    setLoading(true);
    const result = await promptAsync();
    // user cancelled / closed the browser
    if (result.type !== 'success') {
      Alert.alert('Login cancelled');
      setLoading(false);
      return;
    }

    // ------------ success flow not needed here as it will redirect to oauth2redirect screen -------------
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MoodChat</Text>
      <Text style={styles.subtitle}>Organize your life with ease</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Sign in with Google</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ECEDEE',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9BA1A6',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7F5AF0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ECEDEE',
  },
});
