import React, { useState } from "react"
import { View, TextInput, Pressable } from "react-native"
import Send from "@/components/icons/Send";

export default (props: any) => {
    const {
        styles,
        sendMessage
    } = props;

    const [inputText, setInputText] = useState('');

    return (
        <View style={styles.footer}>
            <TextInput
                style={styles.textInput}
                placeholder="Type a message"
                placeholderTextColor={"#AAA"}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />
            <Pressable hitSlop={10} style={styles.sendButton} onPress={() => sendMessage(inputText, setInputText)}>
                <Send name="send" size={25} color="#4caf50" />
            </Pressable>
        </View>
    )
}
