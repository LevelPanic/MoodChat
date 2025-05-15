import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {router, useFocusEffect} from 'expo-router';
import TabContent from './tab';
import Cross from '@/components/icons/Cross';
import styles from '@/assets/styles';
import useTask from '@/hooks/useTasks';
import BottomBar from '@/components/BottomBar';

const Tasks = () => {
  const Tab = createMaterialTopTabNavigator();
  const [searchAll, setSearchAll] = useState('');
  const [searchCompalin, setSearchComplain] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSupport, setSearchSupport] = useState('');
  const {
    data: allData,
    isLoading: isLoadingAllTickets,
    refetch: refetchAllTickets,
    fetchNextPage: fetchNextPageAll,
    hasNextPage: hasNextPageAll,
  } = useTask('all', searchAll);
  const {
    data: complainData,
    isLoading: isLoadingComplainTickets,
    refetch: refetchCompalinTickets,
    fetchNextPage: fetchNextPageComplain,
    hasNextPage: hasNextPageComplain,
  } = useTask('high', searchCompalin);
  const {
    data: queryData,
    isLoading: isLoadingQueryTickets,
    refetch: refetchQueryTickets,
    fetchNextPage: fetchNextPageQuery,
    hasNextPage: hasNextPageQuery,
  } = useTask('low', searchQuery);
  const {
    data: supportData,
    isLoading: isLoadingSupportTickets,
    refetch: refetchSupportTickets,
    fetchNextPage: fetchNextPageSupport,
    hasNextPage: hasNextPageSupport,
  } = useTask('backlog', searchSupport);

  useEffect(() => {
    refetchAllTickets();
  }, [searchAll]);
  useEffect(() => {
    refetchCompalinTickets();
  }, [searchCompalin]);
  useEffect(() => {
    refetchQueryTickets();
  }, [searchQuery]);
  useEffect(() => {
    refetchSupportTickets();
  }, [searchSupport]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        refetchAllTickets();
        refetchCompalinTickets();
        refetchQueryTickets();
        refetchSupportTickets();
      }
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <SafeAreaView style={[styles.container, {paddingBottom: 70}]}>
      <View style={[styles.container, styles.ph15, styles.pt15, {marginBottom: -10}]}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: 'transparent', shadowOpacity: 0, elevation: 0},
            tabBarLabel: (props: any) => <Text style={{color: '#fefdfe'}}>{props.children}</Text>,
          }}>
          <Tab.Screen
            name={'all'}
            children={() => (
              <TabContent
                data={allData?.pages.map((item: any) => item?.data?.data).flat()}
                loading={isLoadingAllTickets}
                hasNextPage={hasNextPageAll}
                fetchNextPage={fetchNextPageAll}
                refetch={refetchAllTickets}
                setSearch={setSearchAll}
                search={searchAll}
              />
            )}
            options={{
              title: 'All',
              // tabBarIcon: () => <View style={{backgroundColor: 'darkturquoise', borderRadius: 100, height: 20, width: 20}} />,
            }}
          />
          <Tab.Screen
            name={'high'}
            children={() => (
              <TabContent
                data={complainData?.pages.map((item: any) => item?.data?.data).flat()}
                loading={isLoadingComplainTickets}
                hasNextPage={hasNextPageComplain}
                fetchNextPage={fetchNextPageComplain}
                refetch={refetchCompalinTickets}
                setSearch={setSearchComplain}
                search={searchCompalin}
              />
            )}
            options={{
              title: 'High',
              tabBarIcon: () => <View style={{backgroundColor: 'crimson', borderRadius: 100, height: 15, width: 15}} />,
            }}
          />
          <Tab.Screen
            name={'low'}
            children={() => (
              <TabContent
                data={queryData?.pages.map((item: any) => item?.data?.data).flat()}
                loading={isLoadingQueryTickets}
                hasNextPage={hasNextPageQuery}
                fetchNextPage={fetchNextPageQuery}
                refetch={refetchQueryTickets}
                setSearch={setSearchQuery}
                search={searchQuery}
              />
            )}
            options={{
              title: 'Low',
              tabBarIcon: () => <View style={{backgroundColor: '#3C8AFF', borderRadius: 100, height: 15, width: 15}} />,
            }}
          />
          <Tab.Screen
            name={'backlog'}
            children={() => (
              <TabContent
                data={supportData?.pages.map((item: any) => item?.data?.data).flat()}
                loading={isLoadingSupportTickets}
                hasNextPage={hasNextPageSupport}
                fetchNextPage={fetchNextPageSupport}
                refetch={refetchSupportTickets}
                setSearch={setSearchSupport}
                search={searchSupport}
              />
            )}
            options={{
              title: 'Backlog',
              tabBarIcon: () => <View style={{backgroundColor: 'linen', borderRadius: 100, height: 15, width: 15}} />,
            }}
          />
        </Tab.Navigator>
        <TouchableOpacity
          style={{position: 'absolute', right: 25, bottom: 30, padding: 15, backgroundColor: '#16B293', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}
          onPress={() =>
            router.navigate('/tasks/add')
          }>
          <View style={{transform: [{rotate: '45deg'}, {translateX: 3}, {translateY: 3}]}}>
            <Cross fill={'#fff'} width={30} height={30} />
          </View>
        </TouchableOpacity>
      </View>
      <BottomBar />
    </SafeAreaView>
  );
};
  
export default Tasks;

  