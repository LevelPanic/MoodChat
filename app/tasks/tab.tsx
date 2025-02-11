import React from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';
import styles from '@/assets/styles';
import TicketCard from '../../components/Card';
import NoTicketsData from '@/components/icons/NoTasks';
import Search from '@/components/icons/Search';

const TabContent = ({
  data,
  loading,
  hasNextPage,
  fetchNextPage,
  refetch,
  search,
  setSearch,
}: any) => {
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
          {borderColor: '#434756', height: 42},
        ]}>
        <Search />
        <TextInput
          value={search}
          placeholder="Search..."
          style={[styles.ml10, {width: '75%'}]}
          onChangeText={setSearch}
          placeholderTextColor={'#fefdfe'}
          keyboardType="numeric"
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 200}}
          color={'#1b7a6d'}
        />
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={5}
          refreshing={loading}
          contentContainerStyle={{paddingBottom: 20}}
          onRefresh={() => {
            refetch();
          }}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          renderItem={({item}) => <TicketCard item={item} />}
          ListEmptyComponent={() => (
            <View style={[styles.itc, {marginTop: 100}]}>
              <NoTicketsData />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TabContent;
