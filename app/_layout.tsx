import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NativeStackHeader } from '@/components/AppHeader';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={{flex: 1}}>
          {!loggedIn ? (
              <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} initialParams={{setLoggedIn}} />
                <Stack.Screen name="+not-found" options={{ header: NativeStackHeader }} />
                <Stack.Screen name="profile/index" options={{ header: NativeStackHeader }} />
                <Stack.Screen name="tasks/add" options={{ header: NativeStackHeader }} />
              </Stack>
            ) : (
              <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} initialParams={{setLoggedIn}} />
              </Stack>
            )
          }
          <StatusBar backgroundColor={'#222531'} barStyle={'light-content'} />
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
