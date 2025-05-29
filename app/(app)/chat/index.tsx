import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import Body from './body';
import Footer from './footer';
import { useDeepSeek } from '@/contexts/DeepSeekContext';

import styles from './styles';

const ChatScreen = () => {

  const [inputText, setInputText] = useState('');
  // const [messages, setMessages] = useState<any>([
  //   // Text Messages
  //   { id: Date.now(), type: 'text', content: 'Hello, how are you today?', sender: 'me' },
  //   { id: Date.now() + 1, type: 'text', content: 'Let’s discuss the project details later.', sender: 'me' },
  //   { id: Date.now() + 2, type: 'text', content: 'Please review the document attached below.', sender: 'you' },
  //   { id: Date.now() + 3, type: 'text', content: 'Hello, how are you today?', sender: 'me' },
  //   { id: Date.now() + 4, type: 'text', content: 'Let’s discuss the project details later.', sender: 'me' },
  //   { id: Date.now() + 5, type: 'text', content: 'Please review the document attached below.', sender: 'you' },
  //   { id: Date.now() + 6, type: 'text', content: 'Hello, how are you today?', sender: 'me' },
  //   { id: Date.now() + 7, type: 'text', content: 'Let’s discuss the project details later.', sender: 'me' },
  //   { id: Date.now() + 8, type: 'text', content: 'Please review the document attached below.', sender: 'you' },
  //   { id: Date.now() + 9, type: 'text', content: 'Hello, how are you today?', sender: 'me' },
  //   { id: Date.now() + 10, type: 'text', content: 'Let’s discuss the project details later.', sender: 'me' },
  //   { id: Date.now() + 11, type: 'text', content: 'Please review the document attached below.', sender: 'you' },
  // ].reverse());

  const { messages, initializing, sendMessage } = useDeepSeek();

  const [showMessageMenu, setShowMessageMenu] = useState(false);

  // Function to add new message to chat
  // const sendMessage = () => {
  //   if (inputText.trim()) {
  //     setMessages((prev: any[]) => [...(prev.reverse()), { id: Date.now(), type:'text', content: inputText, sender: 'me' }].reverse());
  //     setInputText('');
  //   }
  // };

  const onSend = async () => {
    if (!inputText.trim()) return;
    await sendMessage(inputText.trim());
    setInputText('');
  };

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <SafeAreaView style={styles.container}>
      {!initializing && (<View style={{flex: 1}}>
        {/* Chat Body */}
        <Body
          messages={messages.reverse()}
          openMessageModal={() => setShowMessageMenu(!showMessageMenu)}
          styles={styles}
        />

        {/* Footer */}
        <Footer
          styles={styles}
          sendMessage={onSend}
          inputText={inputText}
          setInputText={setInputText}
        />
      </View>)}

      {/* Message Menu Modal */}
      {/* <Modal isVisible={showMessageMenu} onBackdropPress={() => setShowMessageMenu(false)}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuOption}>Document</Text>
          <Text style={styles.menuOption}>Like</Text>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default ChatScreen;
