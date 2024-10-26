import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { HomeStackParamList } from '../navigators/HomeStackNavigator';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { Chore } from '../types/types';

export type ButtonGroupProps = {
  buttons: {
    label: string;
    icon: string;
    mode?: 'text' | 'outlined' | 'contained' | 'contained-tonal' | 'elevated';
    target: keyof RootStackParamList | keyof HomeStackParamList;
    stack: 'RootStack' | 'HomeStack';
    params?: { chore: Chore } | undefined;
  }[];
};

export default function ButtonGroup({ buttons }: ButtonGroupProps) {
  const { colors } = useTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList & HomeStackParamList>
    >();

  const handleNavigation = (button: ButtonGroupProps['buttons'][number]) => {
    if (button.stack === 'RootStack') {
      if (button.params && button.target === 'EditChore') {
        navigation.navigate(button.target as 'EditChore', button.params);
      } else {
        navigation.navigate(
          button.target as
            | 'Loading'
            | 'Login'
            | 'Register'
            | 'HomeNavigator'
            | 'CreateChore',
          undefined,
        );
      }
    } else if (button.stack === 'HomeStack') {
      navigation.navigate(button.target as keyof HomeStackParamList);
    }
  };

  return (
    <View style={[s.buttonRow, { backgroundColor: colors.elevation.level2 }]}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          icon={button.icon}
          mode={button.mode || 'elevated'}
          elevation={5}
          style={s.button}
          onPress={() => handleNavigation(button)}
        >
          {button.label}
        </Button>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 0,
    padding: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 1,
  },
});
