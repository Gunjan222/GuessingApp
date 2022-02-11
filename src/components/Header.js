import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../constant/colors';

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? colors.primaryColor : 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerAndroid: {
    backgroundColor: colors.primaryColor,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? colors.primaryColor : 'white',
    fontSize: 20,
  },
});

export default Header;
