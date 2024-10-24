import React, { useEffect, useState } from 'react';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  SharedValue,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';
import { Surface } from 'react-native-paper';
import { PieDataItem } from '../types/types';

interface PieSliceProps {
  id: number;
  value: number;
  color: string;
  emoji: string;
  startAngle: number;
  endAngle: number;
  radius: number;
  borderColor: string;
  showBorder: boolean;
  isFirstSlice: boolean;
  isLastSlice: boolean;
  isNewSlice: boolean;
  isRemovedSlice: boolean;
  prevStartAngle: number;
  prevEndAngle: number;
  nextSliceGrowing: boolean;
  prevSliceGrowing: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(SvgText);

function PieSlice({
  id,
  value,
  color,
  emoji,
  startAngle,
  endAngle,
  radius,
  borderColor,
  showBorder,
  isFirstSlice,
  isLastSlice,
  isNewSlice,
  isRemovedSlice,
  prevStartAngle,
  prevEndAngle,
  nextSliceGrowing,
  prevSliceGrowing,
}: PieSliceProps) {
  const progress = useSharedValue(isNewSlice ? 0 : 1);
  const animatedStartAngle = useSharedValue(prevStartAngle);
  const animatedEndAngle = useSharedValue(prevEndAngle);

  useEffect(() => {
    if (isNewSlice) {
      progress.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else if (isRemovedSlice) {
      progress.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      progress.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
    animatedStartAngle.value = withTiming(startAngle, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    animatedEndAngle.value = withTiming(endAngle, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  }, [startAngle, endAngle, isNewSlice, isRemovedSlice]);

  const animatedProps = useAnimatedProps(() => {
    const currentStartAngle = animatedStartAngle.value;
    const currentEndAngle = animatedEndAngle.value;
    const currentProgress = progress.value;

    let adjustedStartAngle = currentStartAngle;
    let adjustedEndAngle = currentEndAngle;

    if (isRemovedSlice) {
      if (nextSliceGrowing && prevSliceGrowing) {
        // Both neighboring slices are growing, shrink towards the middle
        const midAngle = (currentStartAngle + currentEndAngle) / 2;
        adjustedStartAngle = interpolate(
          currentProgress,
          [0, 1],
          [currentStartAngle, midAngle],
        );
        adjustedEndAngle = interpolate(
          currentProgress,
          [0, 1],
          [currentEndAngle, midAngle],
        );
      } else if (nextSliceGrowing) {
        adjustedEndAngle = interpolate(
          currentProgress,
          [0, 1],
          [currentEndAngle, currentStartAngle],
        );
      } else if (prevSliceGrowing) {
        adjustedStartAngle = interpolate(
          currentProgress,
          [0, 1],
          [currentStartAngle, currentEndAngle],
        );
      }
    }

    if (adjustedEndAngle - adjustedStartAngle >= 2 * Math.PI - 0.01) {
      const circlePath = `M 0,${-radius} A ${radius},${radius} 0 1,1 0,${radius} A ${radius},${radius} 0 1,1 0,${-radius} Z`;
      return { d: circlePath };
    }

    const x1 = radius * Math.cos(adjustedStartAngle);
    const y1 = radius * Math.sin(adjustedStartAngle);
    const x2 = radius * Math.cos(adjustedEndAngle);
    const y2 = radius * Math.sin(adjustedEndAngle);
    const largeArcFlag =
      adjustedEndAngle - adjustedStartAngle <= Math.PI ? '0' : '1';
    const pathData = `M0,0 L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

    return { d: pathData };
  });

  const animatedBorderProps = useAnimatedProps(() => {
    if (!showBorder || isLastSlice) return { d: '' };

    const currentStartAngle = animatedStartAngle.value;
    const currentEndAngle = animatedEndAngle.value;

    const x1 = Math.round(radius * Math.cos(currentStartAngle) * 1000) / 1000;
    const y1 = Math.round(radius * Math.sin(currentStartAngle) * 1000) / 1000;
    const x2 = Math.round(radius * Math.cos(currentEndAngle) * 1000) / 1000;
    const y2 = Math.round(radius * Math.sin(currentEndAngle) * 1000) / 1000;

    if (isFirstSlice) {
      return { d: `M0,0 L${x1},${y1} M0,0 L${x2},${y2}` };
    } else {
      return { d: `M0,0 L${x2},${y2}` };
    }
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
      {showBorder && !isLastSlice && (
        <AnimatedPath
          animatedProps={animatedBorderProps}
          stroke={borderColor}
          strokeWidth="2"
          fill="none"
        />
      )}
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
}

interface CustomPieChartProps {
  data: PieDataItem[];
  radius: number;
  borderColor?: string;
  isNewChart?: boolean;
}

export default function CustomPieChart({
  data = [],
  radius,
  borderColor = '#000000',
  isNewChart = false,
}: CustomPieChartProps) {
  const [prevData, setPrevData] = useState<PieDataItem[]>([]);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const showBorders = data.length > 1;

  useEffect(() => {
    setPrevData(data);
  }, [data]);

  let startAngle = -Math.PI / 2;
  let prevStartAngle = -Math.PI / 2;

  return (
    <Surface
      elevation={3}
      style={{ borderRadius: radius, width: radius * 2, height: radius * 2 }}
    >
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
      >
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * (2 * Math.PI);
          const endAngle = startAngle + sliceAngle;
          const isNewSlice =
            isNewChart || !prevData.some((prevItem) => prevItem.id === item.id);
          const prevItem = prevData.find((prevItem) => prevItem.id === item.id);
          const prevEndAngle = prevItem
            ? prevStartAngle + (prevItem.value / total) * (2 * Math.PI)
            : endAngle;
          const nextSliceGrowing =
            index < data.length - 1 &&
            !prevData.some((prevItem) => prevItem.id === data[index + 1].id);
          const prevSliceGrowing =
            index > 0 &&
            !prevData.some((prevItem) => prevItem.id === data[index - 1].id);

          const slice = (
            <PieSlice
              key={item.id}
              id={item.id}
              value={item.value / total}
              color={item.color}
              emoji={item.emoji}
              startAngle={startAngle}
              endAngle={endAngle}
              radius={radius}
              borderColor={borderColor}
              showBorder={showBorders}
              isFirstSlice={index === 0}
              isLastSlice={index === data.length - 1}
              isNewSlice={isNewSlice}
              isRemovedSlice={false}
              prevStartAngle={prevStartAngle}
              prevEndAngle={prevEndAngle}
              nextSliceGrowing={nextSliceGrowing}
              prevSliceGrowing={prevSliceGrowing}
            />
          );
          startAngle = endAngle;
          prevStartAngle = prevEndAngle;
          return slice;
        })}
        {prevData
          .filter((prevItem) => !data.some((item) => item.id === prevItem.id))
          .map((removedItem, index) => {
            const sliceAngle = (removedItem.value / total) * (2 * Math.PI);
            const endAngle = startAngle + sliceAngle;
            const nextSliceGrowing =
              index < prevData.length - 1 &&
              data.some((item) => item.id === prevData[index + 1].id);
            const prevSliceGrowing =
              index > 0 &&
              data.some((item) => item.id === prevData[index - 1].id);

            return (
              <PieSlice
                key={`removed-${removedItem.id}`}
                id={removedItem.id}
                value={removedItem.value / total}
                color={removedItem.color}
                emoji={removedItem.emoji}
                startAngle={startAngle}
                endAngle={endAngle}
                radius={radius}
                borderColor={borderColor}
                showBorder={showBorders}
                isFirstSlice={false}
                isLastSlice={false}
                isNewSlice={false}
                isRemovedSlice={true}
                prevStartAngle={startAngle}
                prevEndAngle={endAngle}
                nextSliceGrowing={nextSliceGrowing}
                prevSliceGrowing={prevSliceGrowing}
              />
            );
          })}
      </Svg>
    </Surface>
  );
}
