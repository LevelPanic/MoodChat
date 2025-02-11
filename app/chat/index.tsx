import React, { useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import Body from './body';
import Footer from './footer';

import styles from './styles';

const ChatScreen = () => {

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<any>([
    // Text Messages
    { id: Date.now(), type: 'text', content: 'Hello, how are you today?', sender: 'me' },
    { id: Date.now() + 1, type: 'text', content: 'Let’s discuss the project details later.', sender: 'me' },
    { id: Date.now() + 2, type: 'text', content: 'Please review the document attached below.', sender: 'you' },

    // Audio Messages
    { id: Date.now() + 3, type: 'audio', content: 'audioFile01.mp3', sender: 'me' },
    { id: Date.now() + 4, type: 'audio', content: 'audioFile02.m4a', sender: 'you' },

    // Media Messages (Images/Videos)
    { id: Date.now() + 5, type: 'media', content: '1.jpg', sender: 'me' },
    { id: Date.now() + 6, type: 'media', content: '2.jpg', sender: 'you' },

    // Document Messages
    { id: Date.now() + 9, type: 'document', content: 'notes.docx', sender: 'me' },
    { id: Date.now() + 10, type: 'document', content: 'projectOutline.xlsx', sender: 'you' },
  ].reverse());
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  // Function to add new message to chat
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prev: any[]) => [...(prev.reverse()), { id: Date.now(), type:'text', content: inputText, sender: 'me' }].reverse());
      setInputText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Chat Body */}
      <Body
        messages={messages}
        styles={styles}
      />

      {/* Footer */}
      <Footer
        styles={styles}
        sendMessage={sendMessage}
        setShowAttachmentMenu={setShowAttachmentMenu}
        inputText={inputText}
        setInputText={setInputText}
      />

      {/* Attachment Menu Modal */}
      <Modal isVisible={showAttachmentMenu} onBackdropPress={() => setShowAttachmentMenu(false)}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuOption}>Document</Text>
          <Text style={styles.menuOption}>Camera</Text>
          <Text style={styles.menuOption}>Gallery</Text>
          <Text style={styles.menuOption}>Audio</Text>
        </View>
      </Modal>

      {/* Options Menu Modal */}
      <Modal isVisible={showOptionsMenu} onBackdropPress={() => setShowOptionsMenu(false)}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuOption}>View Contact</Text>
          <Text style={styles.menuOption}>Media, Links, and Docs</Text>
          <Text style={styles.menuOption}>Search</Text>
          <Text style={styles.menuOption}>Mute Notifications</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChatScreen;
