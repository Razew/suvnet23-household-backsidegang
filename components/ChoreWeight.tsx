import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Badge, Card } from 'react-native-paper';

const initialValue: number = 2;

const ChoreWeight = () => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = () => {
    setIsPressed(true);
  };

  return (
    <Card style={s.container}>
      <TouchableOpacity onPress={handlePress}>
        {isPressed ? (
          <View style={s.numberRow}>
            {[1, 2, 4, 6, 8].map((num, index) => (
              <View
                key={num}
                style={[
                  s.circle,
                  { backgroundColor: `rgba(0, 0, 0, ${0.1 + index * 0.1})` },
                ]}
              >
                <Text style={s.circleText}>{num}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Card.Actions>
            <View style={s.content}>
              <View style={s.textContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  Värde:{' '}
                </Text>
                <Text>Hur energikrävande är sysslan?</Text>
              </View>
              <View>
                <Badge
                  size={30}
                  style={s.badge}
                >
                  {initialValue}
                </Badge>
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
    backgroundColor: 'gray',
    color: 'black',
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  circleText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ChoreWeight;
