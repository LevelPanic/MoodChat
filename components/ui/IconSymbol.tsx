// This file is a fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

type ExpoSymbolName = import('expo-symbols').SymbolViewProps['name'];
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const MAPPING = {
  // See Icons here: https://icons.expo.fyi
  'house.fill': 'home-outline',
  'paperplane.fill': 'send',
  'character.bubble.fill': 'chatbubble-outline',
  'control': 'settings-outline',
  'character.book.closed': 'exit-outline',
  'clipboard': 'clipboard-outline',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-forward',
} satisfies Partial<Record<ExpoSymbolName, IoniconName>>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <Ionicons color={color} size={size} name={MAPPING[name]} style={style} />;
}
