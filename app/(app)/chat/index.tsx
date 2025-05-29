import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import Body from './body';
import Footer from './footer';
import { useDeepSeek } from '@/contexts/DeepSeekContext';

import styles from './styles';

const ChatScreen = () => {

  const { messages, initializing, sendMessage } = useDeepSeek();

  const [showMessageMenu, setShowMessageMenu] = useState(false);

  const onSend = async (inputText: string, setInputText: (text: string) => void) => {
    if (!inputText.trim()) return;
    await sendMessage(inputText.trim());
    setInputText('');
  };

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return (
    <SafeAreaView style={styles.container}>
      {initializing && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator size={50} /></View>}
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
