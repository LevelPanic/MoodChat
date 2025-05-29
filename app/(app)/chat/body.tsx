import React, { useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Background from '@/components/ui/Background';

export default (props: {messages: any[], openMessageModal: () => void, styles: any}) => {
    const {
        messages,
        openMessageModal,
        styles
    } = props;

    let flatListRef = useRef<FlatList<any> | never>(null);

    // Render each message
    const renderMessage = ({ item }: any) => {
        if (item.role === "system") {
            return <View />;
        }
        return (
            <TouchableOpacity activeOpacity={0.8} onLongPress={openMessageModal} style={[
                styles.messageBubble, 
                item.role === 'user' ? styles.myMessage : styles.otherMessage,
            ]}>
                <Text style={styles.messageText}>
                    {item.content}
                </Text>

                {/* Time */}
                <Text style={styles.timestamp}>{new Date(item.id).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{flex: 1, marginBottom: -5}}>
            <View style={{position: 'absolute', zIndex: 0, flex: 1, left: 0, right: 0, top: 0, bottom: 0}}><Background /></View>
            {messages.length ? (
                <FlatList
                    inverted
                    ref={flatListRef}
                    data={[...messages, ...[
                        { id: Date.now(), content: 'Hello, how are you today?', role: 'user' },
                        { id: Date.now() + 1, content: 'Let’s discuss the project details later.', role: 'user' },
                        { id: Date.now() + 2, content: 'Please review the document attached below.', role: 'assistant' },
                        { id: Date.now() + 3, content: 'Hello, how are you today?', role: 'user' },
                        { id: Date.now() + 4, content: 'Let’s discuss the project details later.', role: 'user' },
                        { id: Date.now() + 5, content: 'Please review the document attached below.', role: 'assistant' },
                        { id: Date.now() + 6, content: 'Hello, how are you today?', role: 'user' },
                        { id: Date.now() + 7, content: 'Let’s discuss the project details later.', role: 'user' },
                        { id: Date.now() + 8, content: 'Please review the document attached below.', role: 'assistant' },
                        { id: Date.now() + 9, content: 'Hello, how are you today?', role: 'user' },
                        { id: Date.now() + 10, content: 'Let’s discuss the project details later.', role: 'user' },
                        { id: Date.now() + 11, content: 'Please review the document attached below.', role: 'assistant' },
                    ].reverse()]}
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
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Let's Chat?</Text>
                </View>
            )}
        </View>
    )
}
