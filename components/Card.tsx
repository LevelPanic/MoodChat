import React, {memo} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '@/assets/styles';
import {
  h, w
} from '@/utils/helpers';
import { Task } from '@/types';

const TicketCard = ({item, handleTaskPress, handleTaskLongPress}: {item: Task, handleTaskPress: (item: Task) => void, handleTaskLongPress: (item: Task) => void}) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      delayLongPress={100}
      onLongPress={() => {
        handleTaskLongPress(item);
      }}
      onPress={() => {
        handleTaskPress(item);
      }}
      style={[
        styles.p12,
        styles.br8,
        styles.fdr,
        styles.mb15,
        {flex: 1, borderColor: '#323645', backgroundColor: (item.status ?? true) === 'needsAction' ? '#545867' : '#323645'},
      ]}>
        
      {(item.status ?? true) === 'completed' ? <Text style={{height: 15, width: 15, position: 'absolute', right: 10, top: 10}}>✅</Text> : <View
        style={[
          styles.absolute,
          styles.br45,
          styles.itc,
          styles.jcc,
          {
            width: 15,
            height: 15,
            top: 10,
            left: '100%',
            backgroundColor:
              item?.priority == 'high'
                ? 'crimson'
                : item?.priority == 'low'
                ? '#3C8AFF'
                : 'linen',
          },
        ]} />}
      <View style={{width: w(0.65)}}>
        <Text style={[styles.semiBold16, {color: '#baeadd'}]}>
          {/* Task #{item?.id} */}
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.regular12, {color: '#fefdfe', width: w(0.65)}]}>
          {item?.description === '' ? '...' : item?.description}
        </Text>
        <Text style={[styles.regular10, styles.mt5, {color: '#767676'}]}>
          Due by {(item?.due)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(TicketCard);
