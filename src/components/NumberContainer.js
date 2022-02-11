import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from '../constant/colors';

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderColor: colors.accentColor,
  },
  inputText: {
    fontSize: 20,
    color: colors.accentColor,
  },
});

export default NumberContainer;
