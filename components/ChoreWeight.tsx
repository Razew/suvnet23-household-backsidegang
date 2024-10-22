import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Badge, Card } from 'react-native-paper';

const initialValue: number = 2;

const ChoreWeight = () => (
  <Card style={s.container}>
    <TouchableOpacity onPress={() => console.log('PRESSED')}>
      <Card.Actions>
        <View style={s.content}>
          <View style={s.textContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Value: </Text>
            <Text>How energy-demanding is the task? </Text>
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
    </TouchableOpacity>
  </Card>
);

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
});

export default ChoreWeight;
