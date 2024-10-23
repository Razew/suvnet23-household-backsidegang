import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Card, Text } from 'react-native-paper';

const ChoreFrequency = () => {
  const [value, setValue] = React.useState(7);
  const [isPressed, setIsPressed] = React.useState(false);

  const numbers = Array.from({ length: 31 }, (_, index) => index + 1);

  const handlePress = () => {
    setIsPressed(true);
  };

  const handleNumberPress = (number: number) => {
    setValue(number);
    setIsPressed(false);
  };

  return (
    <Card style={s.container}>
      <TouchableOpacity onPress={handlePress}>
        {isPressed ? (
          <View style={s.numberContainer}>
            {numbers.map((number) => (
              <Text
                onPress={() => handleNumberPress(number)}
                key={number}
                style={s.numberText}
              >
                {number}
              </Text>
            ))}
          </View>
        ) : (
          <Card.Actions>
            <View style={s.content}>
              <View style={s.recur}>
                <Text style={s.text}>Recur:</Text>
              </View>
              <View style={s.frequencyContainer}>
                <Text style={s.textRight}>for every</Text>
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
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  recur: {
    flex: 1,
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginHorizontal: 10,
    backgroundColor: 'rgb(191, 99, 112)',
    color: 'white',
  },
  textRight: {
    color: 'black',
    fontSize: 18,
  },
  numberText: {
    marginHorizontal: 5,
    fontSize: 16,
    color: 'black',
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default ChoreFrequency;
