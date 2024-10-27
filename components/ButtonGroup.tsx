import { StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

export type ButtonGroupProps = {
  buttons: {
    label: string;
    icon: string;
    mode?: 'text' | 'outlined' | 'contained' | 'contained-tonal' | 'elevated';
    labelSize?: number;
    onPress: () => void;
  }[];
};

export default function ButtonGroup({ buttons }: ButtonGroupProps) {
  const { colors } = useTheme();

  return (
    <View style={[s.buttonRow, { backgroundColor: colors.elevation.level2 }]}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          icon={button.icon}
          mode={button.mode ?? 'elevated'}
          elevation={5}
          style={s.button}
          onPress={button.onPress}
          labelStyle={{ fontSize: button.labelSize ?? 16 }}
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
