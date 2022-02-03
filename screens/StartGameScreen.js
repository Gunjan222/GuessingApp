import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const StartGameScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Game Screen!</Text>
      <View style={styles.inputContainer}>
        <Text>Select A Number</Text>
        <TextInput />

        <View style={styles.buttonContainer}>
          <Button title="RESET"></Button>
          <Button title="CONFIRM"></Button>
        </View>
      </View>
    </View>
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
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
});

export default StartGameScreen;
