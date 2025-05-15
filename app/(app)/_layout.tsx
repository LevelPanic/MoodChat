import React, { useEffect } from 'react';
import { InteractionManager, SafeAreaView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { NativeStackHeader } from '@/components/AppHeader';
import { useAuth } from '@/contexts/AuthContext';

export default function AppLayout() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // only run redirect *after* we've rehydrated user
    if (!initializing) {
      const task = InteractionManager.runAfterInteractions(() => {
        if (!user) {
          router.replace('/sign-in');
        }
      });
      return () => task.cancel();
    }
  }, [initializing, user]);

  // while loading or if not logged in, don't render the protected stack
  if (initializing || !user) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ header: props => <NativeStackHeader router={router} {...props} /> }} />
        <Stack.Screen name="profile/index" options={{ header: props => <NativeStackHeader router={router} {...props} /> }} />
        <Stack.Screen name="tasks/add" options={{ header: props => <NativeStackHeader router={router} {...props} /> }} />
      </Stack>
      <StatusBar backgroundColor={'#222531'} barStyle={'light-content'} />
    </SafeAreaView>
  );
}
