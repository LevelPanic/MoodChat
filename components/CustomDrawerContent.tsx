import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { IconSymbol } from './ui/IconSymbol';

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{height: '100%'}}>
      {/* Profile Section */}
      <Link href={'/profile'} style={{alignSelf: "center", paddingVertical: 30}}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {!user?.photo ? <>
              {/* Placeholder icon for user */}
              <Ionicons name="person-circle-outline" size={80} color="#aaa" />
            </> : (
              <Image src={user.photo} style={{height: 80, width: 80, borderRadius: 40}} />
            )}
          </View>
          {/* Replace with user's name and email, or remove if not needed */}
          <View style={styles.profileTextView}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
      </Link>

      {/* The actual Drawer items (Home, Chat, Settings, etc.) */}
      <DrawerItemList {...props} />

      {/* Logout Button */}
      <TouchableOpacity onPress={() => {
        // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
        logout();
        router.replace('/sign-in');
      }} style={{position: 'absolute', width: '100%', flexDirection: 'row', alignItems: 'center', left: 30, bottom: 30}}>
        <IconSymbol size={28} name="character.book.closed" color={'#FFF'} />
        <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 10}}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#323645',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: "#323645",
    borderRadius: 20,
  },
  profileImageContainer: {
      width: '100%',
      alignItems: 'center'
  },
  profileTextView: {
      width: '100%',
      alignItems: 'center'
  },
  profileName: {
    textAlign: 'center',
    marginTop: 10,
    color: '#fefdfe',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 14,
    color: '#aaa',
  },
});
