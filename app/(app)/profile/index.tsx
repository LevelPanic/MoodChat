import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable, SafeAreaView, BackHandler } from 'react-native';
import Mail from '@/components/icons/Mail';
import Profile from '@/components/icons/Profile';
import { useFocusEffect, useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('images');

   // When hardware back is pressed, go back in the router
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.back();
        return true; // prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Mail name="email" size={24} color="#4285f4" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoText}>engr.muhtasham@gmail.com</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Profile name="phone" size={24} color="#4285f4" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoText}>Muhtasham</Text>
            </View>
          </View>
        </View>

        {/* Image and Document Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'images' && styles.activeTab]}
            onPress={() => setActiveTab('images')}
          >
            <Text style={activeTab === 'images' ? styles.tabTextActive : styles.tabTextInactive}>Images</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'documents' && styles.activeTab]}
            onPress={() => setActiveTab('documents')}
          >
            <Text style={activeTab === 'documents' ? styles.tabTextActive : styles.tabTextInactive}>Documents</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Rendering for Images or Documents */}
        {activeTab === 'images' ? (
          <View style={styles.imageList}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.imageRow}>
                <Image source={require('@/assets/images/1.jpg')} style={styles.thumbnail} />
                <View>
                  <Text style={styles.imageName}>Car.png</Text>
                  <Text style={styles.imageSize}>500kb</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.documentList}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.documentRow}>
                <Image source={require('@/assets/images/document.png')} style={styles.documentIcon} />
                <View>
                  <Text style={styles.documentName}>bruh.pdf</Text>
                  <Text style={styles.documentSize}>720MB</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.endSpacing} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 40
  },
  endSpacing: {
    flex: 1,
    height: 50
  },
  header: {
    backgroundColor: '#2a9d8f',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileTag: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  role: {
    fontSize: 14,
    color: '#fff',
  },
  menuIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#000"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  infoContainer: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#000"
  },
  infoText: {
    flex: 1,
    paddingRight: 30,
    fontSize: 14,
    color: "#000"
  },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
  },
  activeTab: {
    borderColor: '#2a9d8f',
  },
  tabTextActive: {
    color: '#2a9d8f',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#444',
    fontWeight: 'bold',
  },

  // Document list styles
  documentList: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  documentIcon: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 15,
  },
  documentName: {
    fontSize: 16,
    color: "#000"
  },
  documentSize: {
    fontSize: 14,
    color: '#888',
  },
  // Image List Styles
  imageList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  imageName: {
    fontSize: 16,
    color: "#000"
  },
  imageSize: {
    fontSize: 14,
    color: '#888',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
    color: '#333',
  },
});

export default ProfileScreen;
