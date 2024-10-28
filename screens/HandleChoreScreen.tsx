import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Surface, Text, TextInput } from 'react-native-paper';
import ButtonGroup, { ButtonGroupProps } from '../components/ButtonGroup';
import ChoreFrequency from '../components/ChoreFrequency';
import ChoreWeight from '../components/ChoreWeight';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { addChore, updateChore } from '../store/chores/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCurrentHousehold } from '../store/households/slice';
import { NewChore } from '../types/types';
import { createButton } from '../utils/buttonUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'HandleChore'>;

export default function HandleChoreScreen({ navigation, route }: Props) {
  const chore = route.params.chore;
  const dispatch = useAppDispatch();
  const [titleText, setTitleText] = useState(chore?.name ?? '');
  const [descriptionText, setDescriptionText] = useState(
    chore?.description ?? '',
  );
  const [frequency, setFrequency] = useState(chore?.frequency ?? 7);
  const [weight, setWeight] = useState<1 | 2 | 4 | 6 | 8>(chore?.weight ?? 2);

  const currentHousehold = useAppSelector(selectCurrentHousehold);

  const handlePress = () => {
    if (titleText.length > 2 && currentHousehold) {
      if (chore) {
        dispatch(
          updateChore({
            id: chore.id,
            name: titleText,
            description: descriptionText,
            frequency: frequency,
            weight: weight,
          }),
        );
        navigation.goBack();
      } else {
        const newChore: NewChore = {
          name: titleText,
          household_id: currentHousehold.id,
          description: descriptionText,
          frequency: frequency,
          weight: weight,
        };

        dispatch(addChore(newChore));
        navigation.goBack();
      }
    } else {
      alert(`Unable to ${chore ? 'edit chore' : 'add chore'}`);
    }
  };

  const buttons: ButtonGroupProps['buttons'] = [
    createButton('Save', 'plus', handlePress, undefined, 20),
    createButton('Close', 'close', () => navigation.goBack(), undefined, 20),
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.root}>
        <View style={s.container}>
          <View>
            <Text style={s.title}>
              {chore ? 'Edit chore' : 'Create a new chore'}
            </Text>
          </View>
          <Surface style={s.inputCard}>
            <TextInput
              placeholder="Title"
              value={titleText}
              mode="outlined"
              underlineColor="transparent"
              outlineColor="transparent"
              onChangeText={setTitleText}
              style={s.inputTransparent}
              outlineStyle={s.inputOutline}
            />
          </Surface>
          <Surface style={s.inputCard}>
            <TextInput
              placeholder="Description"
              value={descriptionText}
              onChangeText={setDescriptionText}
              mode="outlined"
              underlineColor="transparent"
              outlineColor="transparent"
              multiline
              style={[s.input, s.inputTransparent]}
              outlineStyle={s.inputOutline}
            />
          </Surface>
          <View style={s.frequencyComponent}>
            <ChoreFrequency
              initialFrequency={frequency}
              setFrequency={setFrequency}
            />
          </View>
          <View style={s.weightComponent}>
            <ChoreWeight
              initialWeight={weight}
              setWeight={setWeight}
            />
          </View>
        </View>
        <ButtonGroup buttons={buttons} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 12,
  },
  inputCard: {
    marginBottom: 16,
    borderRadius: 10,
  },
  input: {
    height: 150,
  },
  inputTransparent: {
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderRadius: 10,
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
