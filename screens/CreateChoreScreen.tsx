import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { TextInput, Text, Card, Button } from 'react-native-paper';
import ChoreFrequency from '../components/ChoreFrequency';
import ChoreWeight from '../components/ChoreWeight';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateChore'>;

export default function CreateChoreScreen({ navigation }: Props) {
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [frequency, setFrequency] = useState(7);
  const [weight, setWeight] = useState(2);

  const handlePress = () => {
    try {
      if (titleText.length < 2) {
        throw new Error('The title must contain at least 2 characters');
      }
      const choreData = {
        title: titleText,
        description: descriptionText,
        frequency: frequency,
        weight: weight,
      };

      console.log('Chore data:', choreData);

      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={s.container}>
        <View>
          <Text style={s.title}>Create a new chore</Text>
        </View>
        <Card style={s.inputCard}>
          <Card.Actions>
            <TextInput
              placeholder="Title"
              value={titleText}
              mode="flat"
              underlineColor="transparent"
              onChangeText={setTitleText}
              style={s.input}
            />
          </Card.Actions>
        </Card>
        <Card style={s.inputCard}>
          <Card.Actions>
            <TextInput
              placeholder="Description"
              value={descriptionText}
              onChangeText={setDescriptionText}
              mode="flat"
              underlineColor="transparent"
              multiline={true}
              style={[s.input, { height: 100 }]}
            />
          </Card.Actions>
        </Card>
        <View style={s.frequencyComponent}>
          <ChoreFrequency setFrequency={setFrequency} />
        </View>
        <View style={s.weightComponent}>
          <ChoreWeight setWeight={setWeight} />
        </View>
        <View style={s.buttonRow}>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => handlePress()}
          >
            Save
          </Button>
          <Button
            icon="close"
            mode="outlined"
            onPress={() => navigation.goBack()}
          >
            Close
          </Button>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 12,
  },
  inputCard: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200,
  },
  frequencyComponent: {
    height: 60,
    marginBottom: 16,
  },
  weightComponent: {
    height: 80,
    marginBottom: 16,
  },
});
