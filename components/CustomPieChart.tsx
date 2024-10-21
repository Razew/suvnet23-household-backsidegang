import React, { useEffect } from 'react';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

interface PieSliceProps {
  value: number;
  color: string;
  emoji: string;
  startAngle: number;
  endAngle: number;
  radius: number;
  isSingleSlice: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(SvgText);

const PieSlice: React.FC<PieSliceProps> = ({
  value,
  color,
  emoji,
  startAngle,
  endAngle,
  radius,
  isSingleSlice,
}) => {
  const animatedStartAngle = useSharedValue(startAngle);
  const animatedEndAngle = useSharedValue(endAngle);

  useEffect(() => {
    if (value > 0) {
      animatedStartAngle.value = withTiming(startAngle, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
      animatedEndAngle.value = withTiming(endAngle, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      animatedEndAngle.value = withTiming(startAngle, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [startAngle, endAngle, value]);

  const animatedProps = useAnimatedProps(() => {
    const currentStartAngle = animatedStartAngle.value;
    const currentEndAngle = animatedEndAngle.value;

    if (currentEndAngle - currentStartAngle >= 2 * Math.PI - 0.01) {
      const circlePath = `M 0,${-radius} A ${radius},${radius} 0 1,1 0,${radius} A ${radius},${radius} 0 1,1 0,${-radius} Z`;
      return { d: circlePath };
    }

    const largeArcFlag = currentEndAngle - currentStartAngle >= Math.PI ? 1 : 0;
    const x1 = radius * Math.cos(currentStartAngle);
    const y1 = radius * Math.sin(currentStartAngle);
    const x2 = radius * Math.cos(currentEndAngle);
    const y2 = radius * Math.sin(currentEndAngle);
    const pathData = `M0,0 L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

    return { d: pathData };
  });

  const animatedEmojiProps = useAnimatedProps(() => {
    const midAngle = (animatedStartAngle.value + animatedEndAngle.value) / 2;
    const emojiX = (radius / 1.5) * Math.cos(midAngle);
    const emojiY = (radius / 1.5) * Math.sin(midAngle);
    return { x: emojiX, y: emojiY };
  });

  return (
    <G>
      <AnimatedPath
        animatedProps={animatedProps}
        fill={color}
      />
      <AnimatedText
        animatedProps={animatedEmojiProps}
        fontSize={radius / 4}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {emoji}
      </AnimatedText>
    </G>
  );
};

interface CustomPieChartProps {
  data: { value: number; color: string; emoji: string }[];
  radius: number;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data = [],
  radius,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = -Math.PI / 2;
  const isSingleSlice = data.length === 1;

  return (
    <Svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
    >
      {data.map((item, index) => {
        const endAngle = startAngle + (item.value / total) * 2 * Math.PI;
        const slice = (
          <PieSlice
            key={index}
            value={item.value / total}
            color={item.color}
            emoji={item.emoji}
            startAngle={startAngle}
            endAngle={endAngle}
            radius={radius}
            isSingleSlice={isSingleSlice}
          />
        );
        startAngle = endAngle;
        return slice;
      })}
    </Svg>
  );
};

export default CustomPieChart;
