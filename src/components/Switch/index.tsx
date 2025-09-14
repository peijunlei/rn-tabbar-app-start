import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';

interface SwitchProps {
  /** 开关状态 */
  value: boolean;
  /** 状态改变回调 */
  onValueChange: (value: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 开关宽度 */
  width?: number;
  /** 开关高度 */
  height?: number;
  /** 开启时的背景色 */
  activeColor?: string;
  /** 关闭时的背景色 */
  inactiveColor?: string;
  /** 滑块颜色 */
  thumbColor?: string;
}
const animationConfig = {
  damping: 15,
  stiffness: 150,
};
export default function Switch({
  value,
  onValueChange,
  disabled = false,
  width = 50,
  height = 30,
  activeColor = '#4CAF50',
  inactiveColor = '#E0E0E0',
  thumbColor = '#FFFFFF',

}: SwitchProps) {
  // 动画值：0 表示关闭，1 表示开启
  const animatedValue = useSharedValue(0);

  // 滑块大小（略小于开关高度）
  const thumbSize = height * 0.8;
  // 滑块移动距离
  const thumbTranslateX = width - thumbSize - (height - thumbSize);

  // 更新动画值
  React.useEffect(() => {
    animatedValue.value = withSpring(value ? 1 : 0, animationConfig);
  }, [value, animatedValue, animationConfig]);

  // 背景色动画样式
  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [inactiveColor, activeColor]
      )
    };
  });

  // 滑块动画样式
  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animatedValue.value * thumbTranslateX,
        },
      ],
    };
  });

  // 处理点击事件
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        {
          width,
          height,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.track,
          backgroundStyle,
          {
            width,
            height,
            padding: (height - thumbSize) / 2,
            borderRadius: height / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            thumbStyle,
            {
              width: thumbSize,
              height: thumbSize,
              backgroundColor: thumbColor,
              borderRadius: thumbSize / 2,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});