import { StyleSheet } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';

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
    <Surface
      style={[
        s.buttonRow,
        { paddingTop: 0.75 },
        // { backgroundColor: colors.elevation.level2 },
      ]}
      elevation={5}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          icon={button.icon}
          mode={button.mode ?? 'elevated'}
          elevation={5}
          style={[s.button, { backgroundColor: colors.elevation.level2 }]}
          onPress={button.onPress}
          labelStyle={{ fontSize: button.labelSize ?? 16 }}
        >
          {button.label}
        </Button>
      ))}
    </Surface>
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
    // gap: 1,
  },
});
