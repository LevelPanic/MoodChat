import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Drawer } from 'expo-router/drawer'; 
import { IconSymbol } from '@/components/ui/IconSymbol';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Colors } from '@/constants/Colors';

// Custom drawer content
import { CustomDrawerContent } from '@/components/CustomDrawerContent';
import { DrawerHeader } from '@/components/AppHeader';

export default function DrawerLayout() {
  // const colorScheme = useColorScheme();
  // const currentColors = Colors[colorScheme ?? 'light'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: DrawerHeader,
          drawerStyle: {
            backgroundColor: '#222531',
            width: 260,
          },
          drawerActiveTintColor: '#fefdfe',
          drawerActiveBackgroundColor: '#787f9a',
          drawerInactiveTintColor: '#fefdfe',
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
          drawerItemStyle: {
            borderRadius: 8,
            marginVertical: 4,
          },
          drawerType: 'slide',
          // If you want to hide the built-in header:
          // headerShown: false,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="chat"
          options={{
            title: 'Chat',
            drawerIcon: ({ color }) => (
              <IconSymbol size={28} name="character.bubble.fill" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            drawerIcon: ({ color }) => (
              <IconSymbol size={28} name="clipboard" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: ({ color }) => (
              <IconSymbol size={28} name="control" color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
