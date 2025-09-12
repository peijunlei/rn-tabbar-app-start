import React, { useState } from 'react';
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
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState(RefreshState.IDLE);

  const onTriggerRefresh = async () => {
    await onRefresh();
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

        const p = Math.min(dampedDistance / threshold, 1);
        runOnJS(setProgress)(p);

        if (dampedDistance > 0 && state === RefreshState.IDLE) {
          runOnJS(setState)(RefreshState.PULLING);
        }
      }
    })
    .onEnd((event) => {
      if (state === RefreshState.REFRESHING) return;
      // ⚠️ 注意：结束时要用 translateY，而不是原始的 event.translationY
      if (translateY >= threshold) {
        runOnJS(onTriggerRefresh)();
      } else {
        runOnJS(setTranslateY)(0);
      }
    });

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
