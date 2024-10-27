import { ButtonGroupProps } from '../components/ButtonGroup';

export function createButton(
  label: string,
  icon: string,
  onPress: () => void,
  mode?: 'text' | 'outlined' | 'contained' | 'contained-tonal' | 'elevated',
  labelSize?: number,
): ButtonGroupProps['buttons'][number] {
  return {
    label,
    icon,
    onPress,
    mode,
    labelSize,
  };
}
