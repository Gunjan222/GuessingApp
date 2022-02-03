import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.styles}}></View>;
};

const styles = StyleSheet.create({
  card: {
    // shadowColor: 'black',
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
