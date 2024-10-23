import { ThemeContext } from '../providers/ThemeProvider'; // Adjust the path as necessary
import { useContext } from 'react';
import { SegmentedButtons } from 'react-native-paper';

export default function DarkLightModeButton() {
  const { colorMode, setColorMode } = useContext(ThemeContext) as {
    colorMode: string;
    setColorMode: (value: string) => void;
  };

  return (
    <SegmentedButtons
      value={colorMode}
      onValueChange={setColorMode}
      buttons={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'auto', label: 'Auto' },
      ]}
    />
  );
}
