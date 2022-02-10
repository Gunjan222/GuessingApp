import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
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

const renderListItems = (listLength, itemData) => (
  <View style={styles.listItems}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
    {/* {console.log(
      'itemData - ',
      itemData,
      'index - ',
      itemData.index,
      'listLength - ',
      listLength,
    )} */}
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);
  const [pastGuesses, setPastGuesses] = React.useState([
    initialGuess.toString(),
  ]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = React.useState(
    Dimensions.get('window').width,
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = React.useState(
    Dimensions.get('window').height,
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const {userChoice, onGameOver} = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    const buttonDimension = Dimensions.addEventListener('change', updateLayout);
    return () => {
      buttonDimension.remove();
    };
  });

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
    setPastGuesses(curPastGusses => [nextNumber.toString(), ...curPastGusses]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>

        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            LOWER
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            GREATER
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItems.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
          {/* <Text>{pastGuesses.length}</Text> */}
        </View>
      </View>
    );
  }

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
      <View style={listContainerStyle}>
        {/* <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItems(guess, pastGuesses.length - index),
          )}
          <Text>{index}</Text>
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItems.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
        {/* <Text>{pastGuesses.length}</Text> */}
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
    marginTop: Dimensions.get('window').height > 600 ? 10 : 5,
    width: 400,
    maxWidth: '90%',
  },
  controls: {
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listContainer: {
    flex: 1,
    width: '60%',
    // alignItems: 'center',
    // width: Dimensions.get('window').width > 350 ? '60%' : '80%',
  },
  listContainerBig: {
    flex: 1,
    width: '60%',
  },
  listItems: {
    width: '100%',
    // widthMax: '90%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default GameScreen;
