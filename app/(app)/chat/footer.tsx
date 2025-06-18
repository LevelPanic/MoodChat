import React, { useState } from "react"
import { View, TextInput, Pressable, ActivityIndicator } from "react-native"
import Send from "@/components/icons/Send";

export default (props: any) => {
    const {
        styles,
        sendMessage,
        loadingReply
    } = props;

    const [inputText, setInputText] = useState('');

    return (
        <View style={styles.footer}>
            <TextInput
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                placeholder="Type a message"
                placeholderTextColor="#AAA"
                multiline numberOfLines={4}
                textAlignVertical="top"
                style={styles.textInput}
            />
            <Pressable hitSlop={10} disabled={loadingReply} style={styles.sendButton} onPress={() => {
                sendMessage(inputText);
                setInputText('');
            }}>
                {loadingReply ? <ActivityIndicator color="#FFFFFF" /> : <Send name="send" size={25} color="#4caf50" />}
            </Pressable>
        </View>
    )
}
