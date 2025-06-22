import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Markdown from 'react-native-markdown-display';
import Background from '@/components/ui/Background';
import { parseChat } from "./chatParser";

export default (props: { messages: any[], openMessageModal: (message: any) => void, styles: any }) => {
  const {
    messages,
    openMessageModal,
    styles
  } = props;

  let flatListRef = useRef<FlatList<any> | never>(null);

  // Render each message
  const renderMessage = ({ item }: any) => {
    let {content, tasks} = parseChat(item.content)
    // console.log(tasks)
    if (item.role === "system") {
      return <View />;
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={() => openMessageModal({tasks, content})} style={[
        styles.messageBubble,
        item.role === 'user' ? styles.myMessage : styles.otherMessage,
      ]}>
        <Markdown style={markdownStyles}>
          {content}
        </Markdown>

        {/* Time */}
        <Text style={styles.timestamp}>{new Date(item.id).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, marginBottom: -5 }}>
      <View style={{ position: 'absolute', zIndex: 0, flex: 1, left: 0, right: 0, top: 0, bottom: 0 }}><Background /></View>
      {messages.filter(itm => itm.role !== 'system').length ? (
        <FlatList
          inverted
          ref={flatListRef}
          data={[...messages].reverse()}
          renderItem={renderMessage}
          keyExtractor={(item, index) => item.id?.toString() ?? `null${index}`}
          contentContainerStyle={styles.chatBody}
          onContentSizeChange={() => {
            // 2. Scroll to the bottom once content size changes
            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
          }}
          onLayout={() => {
            // 3. Also scroll to the bottom on layout
            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
          }}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Let's Chat?</Text>
        </View>
      )}
    </View>
  )
}

const markdownStyles = StyleSheet.create({
  body: { fontSize: 16, lineHeight: 22, color: '#efefef' },
  heading1: { fontSize: 24, marginTop: 12, marginBottom: 6 },
  heading2: { fontSize: 20, marginTop: 10, marginBottom: 4 },
  code_block: {
    fontFamily: 'Menlo',
    fontSize: 14,
    backgroundColor: '#222222',
    padding: 8,
    borderRadius: 4,
  },
  fence: {   // triple-backtick blocks
    backgroundColor: '#222222',
    padding: 8,
    borderRadius: 4,
  },
  // you can override more (lists, links, etc.) here…
});
