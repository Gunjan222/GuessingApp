import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../constant/colors';

const MainButton = props => {
  //   let ButtonComponent = TouchableOpacity;

  //   if (Platform.OS === 'android' && Platform.Version >= 21) {
  //     ButtonComponent = TouchableNativeFeedback;
  //   }
  return (
    // <View style={styles.buttonContainer}>
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  //   buttonContainer: {
  //     borderRadius: 25,
  //     overflow: 'hidden',
  //   },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MainButton;
