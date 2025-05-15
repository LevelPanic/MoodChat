import React from "react"
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native"
import { Router } from "expo-router";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import Back from "./icons/Back";
import Hamburger from "./icons/Hamburger";

export const DrawerHeader = (props: DrawerHeaderProps) => {
    const {
        layout,
        route,
        navigation,
        options
    } = props;
    return (
        <View style={{paddingHorizontal: 15, paddingVertical: 12, backgroundColor: '#222531', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Pressable hitSlop={15} style={{}} onPress={() => navigation.openDrawer()}>
                <Hamburger name="hamburger" size={25} color="#fefdfe" />
            </Pressable>
            <View style={{height: 70, width: 70, marginTop: -10, marginBottom: -30, backgroundColor: '#333642', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('@/assets/images/logo.png')} resizeMode="contain" style={{height: 50, width: 50}} />
            </View>
            <Pressable hitSlop={15} style={{width: 30}} onPress={() => {}}>
            </Pressable>
        </View>
    )
};

export const NativeStackHeader = (props: {router: Router}) => {
    const {
        router
    } = props;
    return (
        <View style={{paddingHorizontal: 15, paddingVertical: 12, backgroundColor: '#222531', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#555', borderBottomWidth: 1}}>
            <Pressable hitSlop={15} style={{width: 30}} onPress={() => router.back()}>
                <Back name="arrow-back" size={25} color="#FFF" />
            </Pressable>
            <View style={{height: 70, width: 70, marginTop: -10, marginBottom: -30, backgroundColor: '#333642', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('@/assets/images/logo.png')} resizeMode="contain" style={{height: 50, width: 50}} />
            </View>
            <Pressable hitSlop={15} style={{width: 30}} onPress={() => {}}>
            </Pressable>
        </View>
    )
};
