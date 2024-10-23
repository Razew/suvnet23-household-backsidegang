import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Card, Text } from 'react-native-paper';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const ChoreFrequency = () => {
  const [value, setValue] = React.useState(7);

  return (
    <TouchableOpacity>
      <Card style={s.container}>
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
      </Card>
    </TouchableOpacity>
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
});

export default ChoreFrequency;
