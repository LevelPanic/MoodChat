import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import BottomBar from '@/components/BottomBar';
import { useAuth } from '@/contexts/AuthContext';
import { w } from '@/utils/helpers';

export default function SettingsScreen() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Profile Section */}
        <Link href={'/profile'} style={{alignSelf: "center"}}>
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
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: w(0.6),
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
