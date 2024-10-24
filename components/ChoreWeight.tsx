import { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Badge, Card } from 'react-native-paper';

export default function ChoreWeight() {
  const [isPressed, setIsPressed] = useState(false);
  const [value, setValue] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 0, 0.2)');

  const handlePress = () => {
    setIsPressed(true);
  };

  const handleNumberPress = (num: number, color: string) => {
    setIsPressed(false);
    setValue(num);
    setBackgroundColor(color);
  };

  return (
    <Card style={s.container}>
      <TouchableOpacity onPress={handlePress}>
        {isPressed ? (
          <View style={s.numberRow}>
            {[1, 2, 4, 6, 8].map((num, index) => {
              const color = `rgba(0, 0, 0, ${0.1 + index * 0.1})`;
              return (
                <TouchableOpacity
                  onPress={() => handleNumberPress(num, color)}
                  key={num}
                  style={[s.circle, { backgroundColor: color }]}
                >
                  <Text style={s.circleText}>{num}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <Card.Actions>
            <View style={s.content}>
              <View style={s.textContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  Value:{' '}
                </Text>
                <Text>How energy-demanding is the task?</Text>
              </View>
              <View>
                <Badge
                  size={24}
                  style={[s.badge, { backgroundColor }]}
                >
                  {value}
                </Badge>
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
    height: 80,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  badge: {
    color: 'black',
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  circleText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
