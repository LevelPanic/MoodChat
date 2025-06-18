import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ParsedTask } from "@/types";
import styles from "../styles";

const Task = (props: { task: ParsedTask; idx: number; selected: boolean; setSelected: () => void }) => {
  const { task, idx, selected, setSelected } = props;
  const [reminder, setReminder] = useState(task.reminder);
  return (
    <View key={idx} style={styles.taskContainer}>
      {/* 1. Header */}
      <Pressable hitSlop={10} onPress={setSelected} style={styles.taskBtn}>
        <View
          style={[
            styles.radioOuter,
            selected && styles.radioSelected,
          ]}
        >
          {selected && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.taskTitle}>
          {task.title} – {task.due}
        </Text>
      </Pressable>

      {/* 2. Block Start: Description */}
      <View style={styles.blockStart}>
        <Text style={styles.taskDescription}>
          {task.description}
        </Text>
      </View>

      {/* 3. Block Footer: Reminder toggle */}
      <View style={styles.blockFooter}>
        <Pressable
          style={styles.reminderContainer}
          onPress={() => setReminder(!reminder)}
        >
          <View
            style={[
              styles.radioOuter,
              reminder && styles.radioSelected,
            ]}
          >
            {reminder && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.radioLabel}>Reminder</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Task;