import React, { useEffect, useRef, useState } from 'react';
import {View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, Pressable, ScrollView} from 'react-native';
// import Modal from 'react-native-modal';
import Body from './body';
import Footer from './footer';
import { useDeepSeek } from '@/contexts/DeepSeekContext';

import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ParsedTask } from '@/types';
import * as Clipboard from 'expo-clipboard';
import Task from './components/task';
import { h } from '@/utils/helpers';
import { submitTasks } from '@/api/googletasks';
import { useAuth } from '@/contexts/AuthContext';

const ChatScreen = () => {

  const { messages, initializing, loadingReply, sendMessage } = useDeepSeek();

  const auth = useAuth();

  const [currentMessage, setCurrentMessage] = useState<{tasks: ParsedTask[] | undefined, content: string}>();
  const [selectedTasks, setSelectedTasks] = useState<ParsedTask[]>([]);
  const messageMenuRef = useRef<any>(null);
  const taskMenuRef = useRef<any>(null);

  const onSend = async (inputText: string) => {
    if (!inputText.trim()) return;
    await sendMessage(inputText.trim());
  };

  // useEffect(() => {
  //   console.log(messages)
  // }, [messages])

  const copyToClipboard = async (text: string) => {
    // await Clipboard.setStringAsync(text);
    Alert.alert('Copied!', `"${text}" is now on the clipboard.`);
  };

  const handleSubmit = async () => {
    console.log(selectedTasks);
    await submitTasks(selectedTasks, auth.user?.token!);
    taskMenuRef.current.close();
    setCurrentMessage(undefined);
  }
  
  // console.log(currentMessage)
  
  return (
    <SafeAreaView style={styles.container}>
      {initializing && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size={50} /></View>}
      {!initializing && (<View style={{flex: 1}}>
        {/* Chat Body */}
        <Body
          messages={messages}
          openMessageModal={(message) => {
            setCurrentMessage(message)
            messageMenuRef.current.open()
          }}
          styles={styles}
        />

        {/* Footer */}
        <Footer
          styles={styles}
          loadingReply={loadingReply}
          sendMessage={onSend}
        />
      </View>)}

      {/* TASK MENU */}
      <RBSheet
        ref={taskMenuRef}
        height={h(0.6)}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000004D',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#333642',
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
          // behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        }}>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.sheetContent}>
            {currentMessage?.tasks?.map((task, idx) => <Task key={`task${idx}`} task={task} idx={idx} selected={selectedTasks.includes(task)} setSelected={() => {
              selectedTasks.indexOf(task) === -1 ? setSelectedTasks(prev => [...prev, task]) : setSelectedTasks(prev => [...(prev.filter(itm => itm !== task))])
            }} /> )}
          </ScrollView>
          <View style={styles.sheetSubmit}>
            <TouchableOpacity disabled={selectedTasks.length === 0} onPress={handleSubmit} style={[styles.sheetSubmitBtn, selectedTasks.length === 0 ? styles.sheetSubmitBtnDisabled : {}]}>
              <Text style={styles.sheetSubmitBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>

      {/* MESSAGE MENU */}
      <RBSheet
        ref={messageMenuRef}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000004D',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#333642',
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
          // behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        }}>
        <View style={styles.menuContainer}>
          {currentMessage?.tasks?.length ? <>
            <TouchableOpacity onPress={() => {
              messageMenuRef.current.close()
              taskMenuRef.current.open()
            }}>
              <Text style={styles.menuOption}>Tasks</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </> : null}
          <TouchableOpacity onPress={() => {
              messageMenuRef.current.close()
              copyToClipboard(currentMessage?.content!)
            }}>
            <Text style={styles.menuOption}>Copy to Clipboard</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={() => {
              messageMenuRef.current.close()
              Alert.alert('Thanks!', 'Your feedback helps the app!')
            }}>
            <Text style={styles.menuOption}>Like</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default ChatScreen;
