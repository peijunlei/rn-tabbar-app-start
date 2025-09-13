import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PullToRefreshContainerProps, RefreshState } from './types';
import { runOnJS } from 'react-native-reanimated';
import DefaultIndicator from './PullToRefreshIndicator';

export default function PullToRefreshContainer({
  children,
  onRefresh,
  threshold = 80,
}: PullToRefreshContainerProps) {
  const [translateY, setTranslateY] = useState(0);
  const [state, setState] = useState(RefreshState.IDLE);

  // 使用 useMemo 计算 progress，基于 translateY
  const progress = useMemo(() => {
    return Math.min(translateY / threshold, 1);
  }, [translateY, threshold]);

  const onTriggerRefresh = async () => {
    setState(RefreshState.REFRESHING);
    await onRefresh();
    setState(RefreshState.IDLE);
    setTranslateY(0);
  };
  // 简化的手势处理
  const panGesture = Gesture.Pan()
    .activeOffsetY([5, 9999]) // 最小手势阈值，避免误触
    .failOffsetX([-10, 10])   // 横向滑动失败
    .onStart(() => {
      if (state === RefreshState.REFRESHING) return;
    })
    .onUpdate((event) => {
      if (state === RefreshState.REFRESHING) return;
      const pullDistance = event.translationY;
      if (pullDistance > 0) {
        // ✅ 无 maxPullDistance，用指数阻尼
        const dampingFactor = 1.2; // 可以试试 1.5 ~ 3
        const dampedDistance = threshold * dampingFactor * (1 - Math.exp(-pullDistance / threshold));

        runOnJS(setTranslateY)(dampedDistance);
        // 移除 setProgress 调用，progress 现在通过 useMemo 自动计算
        if (dampedDistance > 0 && state === RefreshState.IDLE) {
          runOnJS(setState)(RefreshState.PULLING);
        }
      }
    })
    .onEnd((event) => {
      if (state === RefreshState.REFRESHING) return;
      if (translateY >= threshold) {
        runOnJS(onTriggerRefresh)();
      } else {
        runOnJS(setState)(RefreshState.IDLE);
        runOnJS(setTranslateY)(0);
      }
    });
  console.log('translateY', translateY)
  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, { transform: [{ translateY }] }]}>
        {/* 指示器区域 */}
        <View style={styles.indicatorContainer}>
          <DefaultIndicator
            state={state}
            progress={progress}
          />
        </View>

        {/* 内容区域 */}
        <View
          style={[
            styles.contentContainer,
          ]}
        >
          {children}
        </View>
      </View>
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
