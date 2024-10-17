import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function CreateHouseholdScreen() {
  const [household, setHousehold] = useState('');
  const [code, setCode] = useState('');

  return (
    <View style={style.container}>
      <TextInput
        label="Enter Household"
        value={household}
        onChangeText={(household) => setHousehold(household)}
      />
      <TextInput
        label="Enter code"
        value={code}
        onChangeText={(code) => setCode(code)}
      />
      <Button
        mode="contained"
        onPress={() => console.log(household, code)}
        style={style.button}
      >
        Create
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
});
