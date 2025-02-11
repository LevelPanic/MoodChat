import React, {memo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '@/assets/styles';
import Profile from '@/components/icons/Profile';
import {
  capitalizeFirstLetter,
  delay,
  formatDate,
  getTimeSince,
  h, w
} from '@/utils/helpers';

const TicketCard = ({item}: any) => {
  const refRBSheet = useRef<any>();
  const [comment, setComment] = useState('');
  const [inquiry, setInquiry] = useState<any>({});
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const onSubmit = (id: number) => {
    let data = {
      comment: comment,
      enquiry_id: id,
    };
    setComment('');
    // mutate(data);
    getInquiries(id);
  };
  const getInquiries = async (inquiryId: number) => {
    await delay(1000);
    setInquiry(item)
    setLoading(false);
  };
  const onImageNotFound = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('============item========================');
        console.log(item);
        console.log('====================================');
        refRBSheet.current.open();
        getInquiries(item?.id);
      }}
      style={[
        styles.p12,
        styles.br8,
        styles.fdr,
        styles.mb15,
        {flex: 1, borderColor: '#323645', backgroundColor: item.status === 'CLOSED' ? '#545867' : '#323645'},
      ]}>
        
      {item.status === 'CLOSED' ? <Text style={{height: 15, width: 15, position: 'absolute', right: 10, top: 10}}>✅</Text> : <View
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
              item?.type == 'high'
                ? 'crimson'
                : item?.type == 'low'
                ? '#3C8AFF'
                : 'linen',
          },
        ]} />}
      <View style={{width: w(0.65)}}>
        <Text style={[styles.semiBold16, {color: '#baeadd'}]}>
          Task #{item?.id}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.regular12, {color: '#fefdfe', width: w(0.65)}]}>
          {item?.details}
        </Text>
        <Text style={[styles.regular10, styles.mt5, {color: '#767676'}]}>
          Created at {formatDate(item?.created_at)}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.mr12}>
        <Comments />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Details />
      </TouchableOpacity> */}
      <RBSheet
        ref={refRBSheet}
        height={h(0.6)}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000004D',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#333642',
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
          // behavior: Platform.OS === 'ios' ? 'padding' : 'height',
        }}>
        {loading ? (
          <ActivityIndicator
            color={'#1b7a6d'}
            size={'large'}
            style={[styles.flex1, styles.jcc]}
          />
        ) : (
          <>
            <View style={styles.p16}>
              <Text style={[styles.semiBold20, {color: '#baeadd'}]}>
                Task #{inquiry?.id}
              </Text>
              {/* <View style={[styles.fdr, styles.itc]}>
            <View
              style={[
                styles.widthHeight16,
                styles.br18,
                styles.mr10,
                {backgroundColor: '#3C8AFF'},
              ]}
            />
            <Text style={[styles.medium12, {color: '#3B8AFF'}]}>
              High Priority
            </Text>
          </View> */}
              <Text
                style={[styles.regular12, styles.mv10, {color: '#fefdfe'}]}
                numberOfLines={3}>
                {inquiry?.details}
              </Text>
              {item?.attachments?.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    console.log(`${item?.attachments[0]?.link}`);
                    Linking.openURL(`${item?.attachments[0]?.link}`);
                  }}
                  style={[
                    styles.br8,
                    styles.bw1,
                    styles.fdr,
                    styles.itc,
                    styles.center,
                    styles.pv4,
                    {maxWidth: w(0.4)},
                  ]}>
                  <Text
                    style={[
                      styles.semiBold14,
                      styles.ml10,
                      {color: '#06416C', paddingTop: 2},
                    ]}>
                    Attachment
                  </Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  height: 1,
                  backgroundColor: '#baeadd11',
                  marginVertical: 12,
                }}
              />
              <Text style={[styles.semiBold16, {color: '#baeadd'}]}>
                Notes
              </Text>
              <View style={{height: 210}}>
                <FlatList
                  keyboardShouldPersistTaps={'handled'}
                  showsVerticalScrollIndicator={false}
                  data={inquiry?.comments}
                  renderItem={({item}) => (
                    <View style={styles.mt12}>
                      <View style={styles.fdr}>
                        {item?.image && !imageError ? (
                          <Image
                            source={{uri: item?.image}}
                            style={[styles.widthHeight32, styles.br30]}
                            onError={() => onImageNotFound()}
                          />
                        ) : (
                          <Profile width={32} height={32} />
                        )}
                        <View style={[styles.flex1, styles.ml12]}>
                          <View style={[styles.fdr, styles.jcsb, styles.itc]}>
                            <Text
                              style={[styles.medium10, {color: '#9a9b9a'}]}>
                              {getTimeSince(item?.created_at)}
                            </Text>
                          </View>
                          <Text style={[styles.regular12, {color: '#fefdfe'}]}>
                            {item?.comment}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
            <View
              style={[
                styles.bw1,
                styles.mh15,
                styles.br8,
                styles.fdr,
                styles.itc,
                styles.jcsb,
                styles.ph15,
                styles.pv10,
                {
                  width: w(1) - 30,
                  position: 'absolute',
                  bottom: 15,
                  borderColor: '#555',
                },
              ]}>
              <TextInput
                placeholder="Write a comment here"
                placeholderTextColor={'#eaebea'}
                onChangeText={text => setComment(text)}
                style={{height: 44, flex: 3}}
                value={comment}
              />
              <TouchableOpacity onPress={() => null} style={{flex: 1, backgroundColor: '#79b9aa', padding: 8, borderRadius: 8, alignItems: 'center'}}>
                <Text style={{color: 'white'}}>Add Note</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </RBSheet>
    </TouchableOpacity>
  );
};

export default memo(TicketCard);
