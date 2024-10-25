import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { TextInput, Text, Card, Icon } from 'react-native-paper';
import ChoreFrequency from '../components/ChoreFrequency';
import ChoreWeight from '../components/ChoreWeight';
import { useState } from 'react';
import { NewChore } from '../types/types';
import { useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateChore'>;

export default function CreateChoreScreen({ navigation }: Props) {
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [frequency, setFrequency] = useState(7);
  const [weight, setWeight] = useState<1 | 2 | 4 | 6 | 8>(2);

  const usersLastHousehold = useAppSelector(selectCurrentHousehold);

  const handlePress = () => {
    try {
      if (titleText.length < 2) {
        throw new Error('The title must contain at least 2 characters');
      } else if (!usersLastHousehold) {
        throw new Error('usersLastHousehold.id is undefined');
      }

      const newChore: NewChore = {
        name: titleText,
        household_id: usersLastHousehold.id,
        description: descriptionText,
        frequency: frequency,
        weight: weight,
      };

      console.log('Chore data:', newChore);

      navigation.goBack();
    } catch (error) {
      alert('The title field must consist of at least two characters.');
      console.error('Error fetching households:', (error as Error).message);
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
              textColor="black"
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
              textColor="black"
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
          <Card
            style={s.saveButton}
            onPress={handlePress}
          >
            <Card.Actions>
              <Icon
                source={'plus'}
                size={20}
              />
              <Text style={{ fontSize: 20 }}>Save</Text>
            </Card.Actions>
          </Card>
          <Card
            style={s.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Card.Actions>
              <Icon
                source={'close'}
                size={20}
              />
              <Text style={{ fontSize: 20 }}>Close</Text>
            </Card.Actions>
          </Card>
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
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 20,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginRight: 8,
  },
  closeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
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