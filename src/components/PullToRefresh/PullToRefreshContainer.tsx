import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PullToRefreshContainerProps, RefreshState } from './types';
import { 
  runOnJS, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  useAnimatedReaction, 
  withTiming
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import DefaultIndicator from './PullToRefreshIndicator';

export default function PullToRefreshContainer({
  children,
  onRefresh,
  threshold = 80,
}: PullToRefreshContainerProps) {
  const translateY = useSharedValue(0);
  const [state, setState] = useState(RefreshState.IDLE);
  const [progress, setProgress] = useState(0);

  // 复位动画配置
  const resetAnimationConfig = {
    damping: 20,
    stiffness: 200,
    mass: 0.8,
  };

  // 使用 useAnimatedReaction 同步 progress
  useAnimatedReaction(
    () => translateY.value,
    (currentValue) => {
      const newProgress = Math.min(currentValue / threshold, 1);
      runOnJS(setProgress)(newProgress);
    }
  );

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onTriggerRefresh = async () => {
    setState(RefreshState.REFRESHING);
    await onRefresh();
    setState(RefreshState.IDLE);
    translateY.value = withSpring(0, resetAnimationConfig);
  };
  
  const panGesture = Gesture.Pan()
    .activeOffsetY([5, 9999])
    .failOffsetX([-10, 10])
    .onStart(() => {
      if (state === RefreshState.REFRESHING) return;
    })
    .onUpdate((event) => {
      if (state === RefreshState.REFRESHING) return;
      const pullDistance = event.translationY;
      if (pullDistance > 0) {
        const dampingFactor = 1.2;
        const dampedDistance = threshold * dampingFactor * (1 - Math.exp(-pullDistance / threshold));

        translateY.value = dampedDistance;
        if (dampedDistance > 0 && state === RefreshState.IDLE) {
          runOnJS(setState)(RefreshState.PULLING);
        }
      }
    })
    .onEnd((event) => {
      if (state === RefreshState.REFRESHING) return;
      if (translateY.value >= threshold) {
        runOnJS(onTriggerRefresh)();
      } else {
        runOnJS(setState)(RefreshState.IDLE);
        translateY.value = withSpring(0, resetAnimationConfig);
      }
    });
  
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.indicatorContainer}>
          <DefaultIndicator
            state={state}
            progress={progress}
          />
        </View>

        <View style={styles.contentContainer}>
          {children}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  indicatorContainer: {
    position: 'absolute',
    width: '100%',
    top: -60,
  },
  contentContainer: { flex: 1 },
});
