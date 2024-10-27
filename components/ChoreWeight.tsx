import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge, Card } from 'react-native-paper';

type ChoreWeightProps = {
  initialWeight: 1 | 2 | 4 | 6 | 8;
  setWeight: (value: 1 | 2 | 4 | 6 | 8) => void;
};

export default function ChoreWeight({
  initialWeight,
  setWeight,
}: ChoreWeightProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [value, setValue] = useState(initialWeight);
  const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 0, 0.2)');

  const handlePress = () => {
    setIsPressed(true);
  };

  const handleNumberPress = (num: 1 | 2 | 4 | 6 | 8, color: string) => {
    setIsPressed(false);
    setValue(num);
    setWeight(num);
    setBackgroundColor(color);
  };

  return (
    <Card style={s.container}>
      <TouchableOpacity onPress={handlePress}>
        {isPressed ? (
          <View style={s.numberRow}>
            {([1, 2, 4, 6, 8] as const).map((num, index) => {
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
    justifyContent: 'center',
    padding: 5,
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
    width: 50,
    height: 50,
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
