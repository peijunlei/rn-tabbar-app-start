import React, { useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, Dimensions, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate, useDerivedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
// 复位动画配置
const resetAnimationConfig = {
  damping: 20,
  stiffness: 200,
  mass: 1,
};
type Props = {
  renderLeftActions?: (progress: number, dragX: number) => React.ReactNode;
  renderRightActions?: (progress: number, dragX: number) => React.ReactNode;
  leftThreshold?: number;
  rightThreshold?: number;
  children: React.ReactNode;
};

export function Swipeable({
  renderLeftActions,
  renderRightActions,
  leftThreshold = 80,
  rightThreshold = 80,
  children,
}: Props) {

  const dragX = useSharedValue(0);  // 当前滑动偏移
  const isOpen = useSharedValue<'left' | 'right' | 'none'>('none');

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 9999]) // 向左超过 10 才激活
    .failOffsetY([-10, 10])       // 防止垂直滑动触发
    .onUpdate((event) => {
      const { translationX } = event;
      if (dragX.value === -rightThreshold) {
        return;
      }
      if (translationX < 0) { // 左滑
        const distance = translationX * 0.5;
        if (Math.abs(distance) <= rightThreshold) {
          // 阈值内，线性滑动
          dragX.value = distance;
        } else {
          // 阈值外，阻尼滑动
          const extra = Math.abs(distance) - rightThreshold;
          const dampingFactor = 0.35; // 阻力系数，越小阻力越大
          dragX.value = -rightThreshold - extra * dampingFactor;
        }
      }
    })
    .onEnd((event) => {
      if (dragX.value <= -rightThreshold / 2) {
        // 打开右侧滑出内容
        dragX.value = withSpring(-rightThreshold, resetAnimationConfig);
        isOpen.value = 'right';
      } else {
        // 没滑够，回归
        dragX.value = withSpring(0, resetAnimationConfig);
        isOpen.value = 'none';
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value }],
  }));


  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container]}>
        {/* {renderLeftActions && (
          <View style={StyleSheet.absoluteFill}>
            {renderLeftActions(leftProgress.value, dragX.value)}
          </View>
        )}
        {renderRightActions && (
          <View style={StyleSheet.absoluteFill}>
            {renderRightActions(rightProgress.value, dragX.value)}
          </View>
        )} */}
        <View style={[styles.actions]}>
          <TouchableOpacity activeOpacity={0.8} style={[styles.action]} onPress={() => {
            dragX.value = withSpring(0, resetAnimationConfig);
            isOpen.value = 'none';
          }}>
            <Text style={[styles.actionText]}>删除</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[animatedStyle]}>
          {children}
        </Animated.View>

      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  actions: {
    position: 'absolute',
    height: '100%',
    width: 80,
    right: 0,
  },
  action: {
    flex: 1,
    backgroundColor: '#698',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontWeight: 500,
    color: '#fff',
  },
});
