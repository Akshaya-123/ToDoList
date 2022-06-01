import React from 'react';
import {View, Text} from 'react-native';
import {colors} from '../utils/colors';

function Header() {
  return (
    <View
      style={{
        backgroundColor: colors.themeColor,
        justifyContent: 'center',
        padding: 10,
      }}>
      <Text
        allowFontScaling={false}
        style={{color: colors.black, fontSize: 16}}>
        To Do List
      </Text>
    </View>
  );
}

export default Header;
