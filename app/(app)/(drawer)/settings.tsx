import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import BottomBar from '@/components/BottomBar';

export default function SettingsScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Profile Section */}
        <Link href={'/profile'} style={{alignSelf: "center"}}>
          <View style={styles.profileSection}>
            {/* Placeholder icon for user */}
            <Ionicons name="person-circle-outline" size={80} color="#aaa" />
            
            {/* Replace with user's name and email, or remove if not needed */}
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </Link>

        {/* Example Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>General Settings</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#fefdfe" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Language</Text>
            <Ionicons name="chevron-forward" size={20} color="#fefdfe" />
          </TouchableOpacity>
        </View>

        {/* Another Example Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#fefdfe" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingItemText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color="#fefdfe" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBar />
    </>
  );
}

// Example styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111420',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    backgroundColor: '#323645',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: "#323645",
    borderRadius: 20,
  },
  profileName: {
    marginTop: 10,
    color: '#fefdfe',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    paddingBottom: 15,
    fontSize: 14,
    color: '#aaa',
    width: '100%',
  },
  settingsSection: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#323645'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#baeadd'
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  settingItemText: {
    fontSize: 16,
    color: '#fefdfe'
  },
});
