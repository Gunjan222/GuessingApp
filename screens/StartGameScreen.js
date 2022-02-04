import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

import Card from '../components/Card';
import Inputs from '../components/Inputs';
import colors from '../constant/colors';

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
    if (choosenNumber === NaN || choosenNumber <= 0 || choosenNumber >= 99) {
      return;
    }
    setConfirmed(true);
    setEnteredInput('');
    setSelectedNumber(parseInt(enteredInput));
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.screen}>
        <Text style={styles.title}>The Game Screen!</Text>
        <Card style={styles.inputContainer}>
          {/* <View style={styles.inputContainer}> */}
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
          {/* </Vsiew> */}
        </Card>
        {confirmed}
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
});

export default StartGameScreen;
