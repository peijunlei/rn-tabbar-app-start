import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
// @ts-ignore
import Icon from 'react-native-vector-icons/Feather';

interface LoadingProps {
  size?: number;   // 整个 Loading 的直径
  color?: string;  // 圆点颜色
  style?: StyleProp<ViewStyle>;
}

export default function Loading({
  style,
  size = 80,
  color = '#fff',
}: LoadingProps) {

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);


  return (
    <Animated.View style={[style, animatedStyle]}>
      <Icon
        name="loader"
        size={size}
        color={color}
      />
    </Animated.View>
  );
}

