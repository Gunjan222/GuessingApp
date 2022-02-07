import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import Card from '../components/Card';
import Inputs from '../components/Inputs';
import colors from '../constant/colors';
import NumberContainer from '../components/NumberContainer';
import {useRef} from 'react';

const StartGameScreen = props => {
  const [enteredInput, setEnteredInput] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState();

  const numberInputHandler = inputText => {
    setEnteredInput(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredInput('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const choosenNumber = parseInt(enteredInput);
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber >= 99) {
      Alert.alert(
        "It's not a number",
        'It has to be a number between 1 and 99. ',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    setConfirmed(true);
    setEnteredInput('');
    setSelectedNumber(choosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You entered:</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="Start Game"
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={styles.title}>The Game Screen!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select A Number</Text>
          <Inputs
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredInput}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="RESET"
                onPress={resetInputHandler}
                color={colors.accentColor}></Button>
            </View>
            <View style={styles.button}>
              <Button
                title="CONFIRM"
                onPress={confirmInputHandler}
                color={colors.primaryColor}></Button>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    // shadowColor: 'black',
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
  button: {
    width: 100,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
