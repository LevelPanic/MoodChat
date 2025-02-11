import React, { useRef, useState } from "react"
import { View, TouchableOpacity, TextInput, Animated } from "react-native"
import Mic from "@/components/icons/Mic";
import Send from "@/components/icons/Send";
import Attach from "@/components/icons/Attach";
import Emoji from "@/components/icons/Emoji";

export default (props: any) => {
    const {
        styles,
        setShowAttachmentMenu,
        inputText,
        setInputText,
        sendMessage
    } = props;

    const [isRecording, setIsRecording] = useState(false);

    const animatedValue = useRef(new Animated.Value(0)).current;

    // Start recording animation
    const startRecording = () => {
        setIsRecording(true);
        Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    // Stop recording animation
    const stopRecording = () => {
        setIsRecording(false);
        Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity>
                <Emoji name="happy-outline" size={25} color="#fefdfe" />
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                placeholder="Type a message"
                placeholderTextColor={"#AAA"}
                value={inputText}
                onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.attachBtn} onPress={() => setShowAttachmentMenu(true)}>
                <Attach name="attach" size={25} color="#fefdfe" />
            </TouchableOpacity>
            {inputText ? (
                <TouchableOpacity onPress={sendMessage}>
                    <Send name="send" size={25} color="#4caf50" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onLongPress={startRecording}
                    onPressOut={stopRecording}
                    style={styles.micIcon}
                >
                    <Mic name="mic" size={25} color={isRecording ? 'red' : '#fefdfe'} />
                </TouchableOpacity>
            )}
        </View>
    )
}
