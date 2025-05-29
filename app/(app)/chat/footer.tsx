import React, { useRef, useState } from "react"
import { View, TouchableOpacity, TextInput, Animated, Pressable } from "react-native"
import Send from "@/components/icons/Send";
// import Mic from "@/components/icons/Mic";
// import Attach from "@/components/icons/Attach";
// import Emoji from "@/components/icons/Emoji";

export default (props: any) => {
    const {
        styles,
        inputText,
        setInputText,
        sendMessage
    } = props;

    // const [isRecording, setIsRecording] = useState(false);

    // const animatedValue = useRef(new Animated.Value(0)).current;

    // Start recording animation
    
    // const startRecording = () => {
    //     setIsRecording(true);
    //     Animated.timing(animatedValue, {
    //     toValue: 1,
    //     duration: 300,
    //     useNativeDriver: true,
    //     }).start();
    // };

    // Stop recording animation
    
    // const stopRecording = () => {
    //     setIsRecording(false);
    //     Animated.timing(animatedValue, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //     }).start();
    // };

    return (
        <View style={styles.footer}>
            {/* <TouchableOpacity>
                <Emoji name="happy-outline" size={25} color="#fefdfe" />
            </TouchableOpacity> */}
            <TextInput
                style={styles.textInput}
                placeholder="Type a message"
                placeholderTextColor={"#AAA"}
                value={inputText}
                onChangeText={setInputText}
            />
            <Pressable hitSlop={10} style={styles.sendButton} onPress={sendMessage}>
                <Send name="send" size={25} color="#4caf50" />
            </Pressable>
            {/* {inputText ? (
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
            )} */}
        </View>
    )
}
