import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import React, { useState } from 'react';
import styles from '@/assets/styles';

const AddTickets = () => {
  const [taskName, setTaskName] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      alert('Please enter a task name');
      return;
    }
    // You can add logic here to save the task to a state, database, or API
    alert(`Task Added: \nName: ${taskName} \nNotes: ${notes}`);
    setTaskName('');
    setNotes('');
  };

  return (
    <View style={styles.container}>
      <Text style={local_styles.heading}>Add Task</Text>
      <View style={local_styles.box}>
        <TextInput
          style={local_styles.input}
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />
        
        <TextInput
          style={local_styles.input}
          placeholder="Add Notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
        
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
};

const local_styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    color: '#bdeebb',
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    overflow: 'hidden',
    backgroundColor: '#333642',
    padding: 20,
    margin: 30,
    marginTop: 0,
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: '#555',
    backgroundColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default AddTickets;
