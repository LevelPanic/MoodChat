import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { Slot, Stack } from 'expo-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoodProvider } from '@/contexts/MoodContext';
import { DeepSeekProvider } from '@/contexts/DeepSeekContext';

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <MoodProvider>
            <DeepSeekProvider>
              <SafeAreaView style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: '#222531'}}>
                <Slot />
                {/* <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(app)" />
                </Stack> */}
                <StatusBar backgroundColor={'#222531'} barStyle={'light-content'} />
              </SafeAreaView>
            </DeepSeekProvider>
          </MoodProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
