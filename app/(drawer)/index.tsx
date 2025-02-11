import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import BottomBar from '@/components/BottomBar';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useRouter();
  return (
    <View style={{flex: 1, backgroundColor: '#111420'}}>
      <ScrollView style={styles.container}>

        {/* Mood Tracking Section */}
        <View style={[styles.card, { backgroundColor: "#FFE4B5", width: '100%', flexDirection: 'row' }]}>
          <Text style={styles.cardTitle}>Mood Today</Text>
          <View style={styles.moodRow}>
            <TouchableOpacity style={styles.moodIcon}>
              <Text style={styles.moodEmoji}>😊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moodIcon}>
              <Text style={styles.moodEmoji}>😐</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moodIcon}>
              <Text style={styles.moodEmoji}>😔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.dashboard}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.card, { backgroundColor: "#FFD700", flex: 1 }]}>
              <Text style={styles.cardTitle}>TASK PROGRESS</Text>
              <View>
                <Text style={styles.cardValue}>5 / 10</Text>
                <Text style={styles.cardSubtitle}>Tasks completed today</Text>
              </View>
            </View>
            <View style={{width: 15}} />
            <View style={[styles.card, { backgroundColor: "#87CEEB", flex: 1 }]}>
              <Text style={styles.cardTitle}>CHATBOT INTERACTIONS</Text>
              <View>
                <Text style={styles.cardValue}>12</Text>
                <Text style={styles.cardSubtitle}>Conversations today</Text>
              </View>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.card, { backgroundColor: "#98FB98", flex: 1 }]}>
              <Text style={styles.cardTitle}>STREAK</Text>
              <View>
                <Text style={styles.cardValue}>7 Days</Text>
                <Text style={styles.cardSubtitle}>Daily engagement streak</Text>
              </View>
            </View>
            <View style={{width: 15}} />
            <View style={[styles.card, { backgroundColor: "#FFA07A", flex: 1 }]}>
              <Text style={styles.cardTitle}>TIME SPENT</Text>
              <View>
                <Text style={styles.cardValue}>3h 20m</Text>
                <Text style={styles.cardSubtitle}>Focus time today</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={[styles.card, { backgroundColor: "#DDA0DD", paddingHorizontal: 10 }]}>
          <Text style={[styles.cardTitle, {marginLeft: 5}]}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>+ Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Set Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('/chat')}>
              <Text style={styles.actionText}>Talk to Bot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2E",
    padding: 15,
    paddingTop: 30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  dashboard: {
    flex: 1
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodIcon: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  moodEmoji: {
    fontSize: 20,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  actionText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
