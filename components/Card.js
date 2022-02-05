import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    fontWeight: 'bold',
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    // shadowColor: 'black',
    elevation: 2,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
