import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { TextInput, Text, Card, Button } from 'react-native-paper';
import ChoreFrequency from '../components/ChoreFrequency';
import ChoreWeight from '../components/ChoreWeight';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateChore'>;

export default function CreateChoreScreen({ navigation }: Props) {
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  return (
    <View style={s.container}>
      <Text style={s.title}>Create a new chore</Text>
      <Card style={s.inputCard}>
        <Card.Actions>
          <TextInput
            placeholder="Title"
            value={titleText}
            mode="flat"
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
            multiline={true}
            style={[s.input, { height: 100 }]}
          />
        </Card.Actions>
      </Card>
      <ChoreFrequency />
      <ChoreWeight />
      <View style={s.buttonRow}>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => console.log('Spara')}
        >
          Spara
        </Button>
        <Button
          icon="close"
          mode="outlined"
          onPress={() => navigation.goBack()}
        >
          Stäng
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
    marginTop: 24,
  },
});
