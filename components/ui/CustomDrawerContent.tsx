import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Profile Section */}
      <Link href={'/profile'} style={{alignSelf: 'center', paddingTop: 50, paddingBottom: 20}}>
        <View style={styles.profileContainer}>
          {/* You can use Ionicons, an Image, or your custom IconSymbol here */}
          <Ionicons name="person-circle-outline" size={60} color="#aaa" />
          <View style={styles.profileTextContainer}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email} ellipsizeMode='tail'>john.doe@example.com</Text>
          </View>
        </View>
      </Link>

      {/* The actual Drawer items (Home, Chat, Settings, etc.) */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#333642',
    borderRadius: 12,
    padding: 20,
  },
  profileTextContainer: {
    paddingTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
    color: '#FFF'
  },
  email: {
    fontSize: 14,
    width: '100%',
    paddingBottom: 5,
    color: '#aaa',
    textAlign: 'center'
  },
});
