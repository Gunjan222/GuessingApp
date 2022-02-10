import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import Card from '../components/Card';
import Inputs from '../components/Inputs';
import colors from '../constant/colors';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
// import {useEffect} from 'react/cjs/react.production.min';

const StartGameScreen = props => {
  const [enteredInput, setEnteredInput] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState();
  const [buttonWidth, setButtonWidth] = React.useState(
    Dimensions.get('window').width / 4,
  );

  const numberInputHandler = inputText => {
    setEnteredInput(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredInput('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    const btnWidthUpdation = Dimensions.addEventListener(
      'change',
      updateLayout,
    );
    return () => {
      btnWidthUpdation.remove();

      // Dimensions.removeEventListener('change', updateLayout);
    };
  });

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
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behaviour="position" keyboardVerticalOffset={30}>
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
                <View style={{width: buttonWidth}}>
                  <Button
                    title="RESET"
                    onPress={resetInputHandler}
                    color={colors.accentColor}></Button>
                </View>
                <View style={{width: buttonWidth}}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    width: '90%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
    // shadowColor: 'black',
    // elevation: 8,
    // padding: 20,
    // borderRadius: 10,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    // maxWidth: '90%',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4,
  // },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
