import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

WebBrowser.maybeCompleteAuthSession();

// ——— CONFIG (same as sign-in.tsx) ———
const CLIENT_ID =
  '890937683469-uupuki0duoceipnrrhvncn2celmnaan5.apps.googleusercontent.com';
const CLIENT_ID_BASE = CLIENT_ID.replace('.apps.googleusercontent.com', '');
const SCHEME = `com.googleusercontent.apps.${CLIENT_ID_BASE}`;
const REDIRECT_URI = AuthSession.makeRedirectUri({
  native: `${SCHEME}:/oauth2redirect`,
});
const DISCOVERY = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint:        'https://oauth2.googleapis.com/token',
  revocationEndpoint:   'https://oauth2.googleapis.com/revoke',
};

export default function OAuth2Redirect() {
  const router = useRouter();
  const { login } = useAuth();
  const params = useLocalSearchParams<{
    code?: string;
    error?: string;
  }>();

  useEffect(() => {
    (async () => {
      // Did Google return an error?
      if (params.error) {
        Alert.alert('Login error', params.error as string);
        router.replace('/sign-in?reset=true');
        return;
      }

      // Wait until we actually have a code
      const code = params.code;
      if (!code) {
        // not yet ready
        return;
      }

      // Retrieve the stored PKCE verifier
      const codeVerifier = await SecureStore.getItemAsync('pkce_code_verifier');
      if (!codeVerifier) {
        Alert.alert('Login error', 'Missing PKCE verifier.');
        router.replace('/sign-in');
        return;
      }

      // Exchange code for tokens
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          clientId:    CLIENT_ID,
          code,
          redirectUri: REDIRECT_URI,
          extraParams: { code_verifier: codeVerifier },
        },
        DISCOVERY
      );

      if (!tokenResult.accessToken) {
        Alert.alert('Login error', 'Failed to get access token.');
        router.replace('/sign-in');
        return;
      }

      // Fetch the Google profile
      const profile = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        { headers: { Authorization: `Bearer ${tokenResult.accessToken}` } }
      ).then(r => r.json());

      // Persist and navigate into your app
      await login({
        token: tokenResult.accessToken,
        name:  profile.name,
        email: profile.email,
        photo: profile.picture,
      });
      router.replace('/');
    })();
  }, [params]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
