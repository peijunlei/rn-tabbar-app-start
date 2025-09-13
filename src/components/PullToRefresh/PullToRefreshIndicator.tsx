import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PullToRefreshIndicatorProps } from './types';

/**
 * 默认下拉刷新指示器
 * 带 loading icon 的指示器
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
      {/* 刷新时显示 loading icon */}
      {state === 'refreshing' && (
        <ActivityIndicator 
          size="small" 
          color="#666" 
          style={styles.loadingIcon}
        />
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
    flexDirection: 'row', // 改为横向布局
  },
  loadingIcon: {
    marginRight: 8, // icon 和文字之间的间距
  },
  text: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
