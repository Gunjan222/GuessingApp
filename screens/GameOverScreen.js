import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import colors from '../constant/colors';
// import img from '../assets/success.png';
const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={300}
          // source={require('../assets/success.png')}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg',
          }}
          style={styles.imagePic}
          resizeMode="cover"
        />
      </View>
      <Text>
        Your phone needed{' '}
        <Text style={styles.highlight}> {props.roundsNumber} </Text> rounds to
        guess the number
        <Text style={styles.highlight}>{props.userNumber}</Text>
      </Text>
      <Button title="New Game" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  imagePic: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: colors.primaryColor,
  },
});

export default GameOverScreen;
