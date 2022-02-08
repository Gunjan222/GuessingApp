import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constant/default-styles';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItems = (value, numOfRounds) => (
  <View key={value} style={styles.listItems}>
    <Text>#{numOfRounds}</Text>
    <Text>{value}</Text>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);
  const [pastGuesses, setPastGuesses] = React.useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", 'You know that this is wrong...!', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses(curPastGusses => [nextNumber, ...curPastGusses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.btnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          LOWER
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          GREATER
        </MainButton>
      </Card>
      <View style={styles.list}>
        {/* <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItems(guess, pastGuesses.length - index),
          )}
          <Text>{index}</Text>
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItems={renderListItems}
        />
        <Text>{pastGuesses.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: 400,
    maxWidth: '90%',
  },
  listItems: {
    width: '90%',
    // widthMax: '90%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  list: {
    alignItems: 'center',
    width: '80%',
  },
});

export default GameScreen;
