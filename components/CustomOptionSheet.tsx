import React, {forwardRef, LegacyRef} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

interface SheetProps {
  options: any[];
  heading: string;
  setValue: any;
  height: number;
}

const CustomOptionSheet = forwardRef(
  ({options, heading, setValue, height}: SheetProps, ref: any) => {
    return (
      <RBSheet
        ref={ref}
        height={height}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#fff',
            width: 53,
            height: 3,
            marginTop: 15,
          },
          container: {
            borderTopStartRadius: 25,
            borderTopEndRadius: 25,
            paddingHorizontal: 15,
          },
        }}>
        <View style={{marginVertical: 10, flex: 1}}>
          {heading && (
            <Text
              style={{color: '#000', fontSize: 16, paddingBottom: 20}}>
              {heading}
            </Text>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((itm, i) => (
              <React.Fragment key={'bottomSheet' + i}>
                <TouchableOpacity
                  style={{paddingBottom: 10}}
                  onPress={() => {
                    setValue(itm);
                    if (heading) {
                      ref?.current?.close();
                    }
                  }}>
                  <Text
                    style={{}}>
                    {itm.name}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      </RBSheet>
    );
  },
);

export default CustomOptionSheet;
