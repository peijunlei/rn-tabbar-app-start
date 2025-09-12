import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PullToRefreshIndicatorProps } from './types';


/**
 * 默认下拉刷新指示器
 * 简单的文字提示指示器
 */
export default function DefaultIndicator({
  state,
  progress,
}: PullToRefreshIndicatorProps) {
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
    return Math.min(progress, 1); // 渐显效果
  };
  const opacity = useMemo(() => {
    return getIndicatorOpacity();
  }, [progress, state]);
  return (
    <View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{getIndicatorText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
