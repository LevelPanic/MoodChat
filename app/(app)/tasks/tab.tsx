// src/screens/tasks/tab.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import styles from '@/assets/styles';
import TicketCard from '@/components/Card';
import NoTicketsData from '@/components/icons/NoTasks';
import Search from '@/components/icons/Search';
import { ParsedTask, Task } from '@/types';

interface TabContentProps {
  data: Task[];
  loading: boolean;
  handleTaskPress: (item: Task) => void;
  handleTaskLongPress: (item: Task) => void;
  refetch: () => void;
}

export default function TabContent({
  data,
  loading,
  handleTaskPress,
  handleTaskLongPress,
  refetch,
}: TabContentProps) {
  const [search, setSearch] = React.useState('');

  // filter client‐side by details/title
  const filtered = data.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.fdr,
          styles.itc,
          styles.bw1,
          styles.br8,
          styles.mv15,
          styles.ph15,
          { borderColor: '#434756', height: 42 },
        ]}
      >
        <Search />
        <TextInput
          value={search}
          placeholder="Search..."
          style={[styles.ml10, { width: '75%' }]}
          onChangeText={setSearch}
          placeholderTextColor={'#fefdfe'}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 200 }}
          color="#1b7a6d"
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.title + item.due}
          refreshing={loading}
          onRefresh={refetch}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View style={[styles.itc, { marginTop: 100 }]}>
              <NoTicketsData />
            </View>
          )}
          renderItem={({ item }) => (
            <TicketCard item={item} handleTaskPress={handleTaskPress} handleTaskLongPress={handleTaskLongPress} />
          )}
        />
      )}
    </View>
  );
}
