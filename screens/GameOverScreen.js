import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import colors from '../constant/colors';
import MainButton from '../components/MainButton';
// import img from '../assets/success.png';
const GameOverScreen = props => {
  return (
    <ScrollView>
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

        <Text style={styles.resultText}>
          Your phone needed
          <Text style={styles.highlight}> {props.roundsNumber} </Text> rounds to
          guess the number
          <Text style={styles.highlight}> {props.userNumber} </Text>
        </Text>
        <MainButton onPress={props.onRestart}> NEW GAME </MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 20,
  },
  imagePic: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
  highlight: {
    color: colors.primaryColor,
  },
});

export default GameOverScreen;
