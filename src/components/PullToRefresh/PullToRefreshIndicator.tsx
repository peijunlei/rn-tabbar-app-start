import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { PullToRefreshIndicatorProps } from './types';

/**
 * 默认下拉刷新指示器
 * 带中心旋转动画的 loading icon
 */
export default function DefaultIndicator({
  state,
  progress,
}: PullToRefreshIndicatorProps) {
  const rotation = useSharedValue(0);

  // 刷新时开始旋转动画
  React.useEffect(() => {
    if (state === 'refreshing') {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1, // 无限循环
        false
      );
    } else {
      rotation.value = 0;
    }
  }, [state]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const getIndicatorText = () => {
    switch (state) {
      case 'pulling':
        return progress >= 1 ? '松开刷新' : '下拉刷新';
      case 'refreshing':
        return '正在刷新...';
      case 'releasing':
        return '刷新完成';
      default:
        return '';
    }
  };

  const getIndicatorOpacity = () => {
    if (state === 'idle') return 0;
    if (state === 'refreshing') return 1;
    return Math.min(progress, 1);
  };

  const opacity = useMemo(() => {
    return getIndicatorOpacity();
  }, [progress, state]);

  return (
    <View style={[styles.container, { opacity }]}>
      {/* 中心旋转的 loading icon */}
      {state === 'refreshing' && (
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <Icon
            name="loader"
            size={16}
            color="#666"
          />
        </Animated.View>
      )}
      <Text style={styles.text}>{getIndicatorText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
