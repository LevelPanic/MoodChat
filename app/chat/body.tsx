import React, { useRef } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default (props: {messages: any[], styles: any}) => {
    const {
        messages,
        styles
    } = props;

    let flatListRef = useRef<FlatList<any> | never>(null);

    // Render each message
    const renderMessage = ({ item }: any) => {
        return (
            <View style={[
                styles.messageBubble, 
                item.sender === 'me' ? styles.myMessage : styles.otherMessage, 
                item.type === 'text' && styles.textMessage, 
                item.type === 'document' && styles.documentMessage,
                item.type === 'media' && styles.mediaMessage,
                item.type === 'audio' && styles.audioMessage
            ]}>
                {item.type !== 'media' && (
                    <Text style={styles.messageText}>
                        {item.content}
                    </Text>
                )}
                {item.type === 'document' && <Image source={require('@/assets/images/document.png')} style={styles.documentIcon} />}
                {item.type === 'media' && (
                    <View style={styles.mediaMessage}>
                        <Image source={require(`@/assets/images/1.jpg`)} style={styles.mediaImage} />
                    </View>
                )}
                {item.type === 'audio' && (
                    <>
                        <Image source={require('@/assets/images/play.png')} style={styles.audioPlayButton} />
                        <Text style={styles.audioDurationText}>0:30</Text>
                    </>
                )}
            </View>
        );
    };
    return (
        <FlatList
            inverted
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id.toString()}
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
    )
}
