import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Badge, Card, Text } from 'react-native-paper';

type ChoreFrequencyProps = {
  initialFrequency?: number;
  setFrequency: (value: number) => void; // Lägg till typ för setFrequency
};

export default function ChoreFrequency({
  initialFrequency,
  setFrequency,
}: ChoreFrequencyProps) {
  const [value, setValue] = useState(initialFrequency);
  const [isPressed, setIsPressed] = useState(false);

  const numbers = Array.from({ length: 31 }, (_, index) => index + 1);

  const handlePress = () => {
    setIsPressed(true);
  };

  const handleNumberPress = (number: number) => {
    setValue(number);
    setFrequency(number);
    setIsPressed(false);
  };

  return (
    <Card style={s.container}>
      <TouchableOpacity onPress={handlePress}>
        {isPressed ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={s.numberContainer}>
              {numbers.map((number) => (
                <TouchableOpacity
                  onPress={() => handleNumberPress(number)}
                  key={number}
                  style={s.numberTouchable}
                >
                  <Text style={s.numberText}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <Card.Actions>
            <View style={s.content}>
              <View style={s.repeat}>
                <Text style={s.text}>Repeat:</Text>
              </View>
              <View style={s.frequencyContainer}>
                <Text style={s.textRight}>every</Text>
                <Badge
                  size={24}
                  style={s.badge}
                >
                  {value}
                </Badge>
                <Text style={s.textRight}>days</Text>
              </View>
            </View>
          </Card.Actions>
        )}
      </TouchableOpacity>
    </Card>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  repeat: {
    flex: 1,
  },
  frequencyContainer: {
    flexDirection: 'row',
  },
  badge: {
    marginHorizontal: 5,
    backgroundColor: 'rgb(191, 99, 112)',
    color: 'white',
  },
  textRight: {
    fontSize: 18,
  },
  numberText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  numberTouchable: {
    marginHorizontal: 5,
  },
});
