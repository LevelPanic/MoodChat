import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import { Link, usePathname } from "expo-router";

export default () => {
  const currentRoute = usePathname();
  console.log(currentRoute)
  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 65,
      width: '100%',
      backgroundColor: '#222531',
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -10 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5,
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      overflow: 'hidden'
    }}>
      <View style={{width: '25%', backgroundColor: currentRoute === '/' ? '#787f9a' : 'transparent'}}>
        <Link href={'/(app)/(drawer)'}>
          <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <IconSymbol size={24} name="house.fill" color={'#fefdfe'} />
            <Text style={{fontSize: 10, color: '#fefdfe'}}>Home</Text>
          </View>
        </Link>
      </View>
      <View style={{width: '25%', backgroundColor: currentRoute === '/chat' ? '#787f9a' : 'transparent'}}>
        <Link href={'/(app)/(drawer)/chat'}>
          <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <IconSymbol size={24} name="character.bubble.fill" color={'#fefdfe'} />
            <Text style={{fontSize: 10, color: '#fefdfe'}}>Chat</Text>
          </View>
        </Link>
      </View>
      <View style={{width: '25%', backgroundColor: currentRoute.includes('/tasks') ? '#787f9a' : 'transparent'}}>
        <Link href={'/(app)/(drawer)/tasks'}>
          <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <IconSymbol size={24} name="clipboard" color={'#fefdfe'} />
            <Text style={{fontSize: 10, color: '#fefdfe'}}>Tasks</Text>
          </View>
        </Link>
      </View>
      <View style={{width: '25%', backgroundColor: currentRoute === '/settings' ? '#787f9a' : 'transparent'}}>
        <Link href={'/(app)/(drawer)/settings'}>
          <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <IconSymbol size={24} name="control" color={'#fefdfe'} />
            <Text style={{fontSize: 10, color: '#fefdfe'}}>Settings</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
