import { truncateToTwoDecimals } from '@/utils/kit';
import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
  Dimensions,
} from 'react-native';

type GridProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns: number;
  gap?: number|[number, number];
  /**横向padding，用于计算实际内容宽度。如果不传入，会自动从布局中获取*/
  paddingHorizontal?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
};
const { width } = Dimensions.get('window');
export function Grid<T>(props: GridProps<T>) {
  const {
    data,
    renderItem,
    columns,
    gap = 10,
    paddingHorizontal,
    style,
    itemStyle,
  } = props;

  const [gridWidth, setGridWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [colGap, rowGap] = Array.isArray(gap) ? gap : [gap, gap];
  
  // 自动计算 paddingHorizontal（如果未传入）
  const actualPaddingHorizontal = useMemo(() => {
    // 如果明确传入了 paddingHorizontal，直接使用
    if (paddingHorizontal !== undefined) {
      return paddingHorizontal;
    }
    // 如果未传入 paddingHorizontal，通过容器宽度和内容宽度自动计算
    if (gridWidth > 0 && contentWidth > 0) {
      return truncateToTwoDecimals((gridWidth - contentWidth) / 2);
    }
    return 0;
  }, [paddingHorizontal, gridWidth, contentWidth]);

  const itemWidth = useMemo(() => {
    if (gridWidth <= 0) return undefined;
    // 减去左右padding得到实际内容宽度
    const actualContentWidth = gridWidth - actualPaddingHorizontal * 2;
    const itemWidth = (actualContentWidth - (columns - 1) * colGap) / columns;
    return (itemWidth);
  }, [gridWidth, columns, colGap, actualPaddingHorizontal]);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const layoutWidth = truncateToTwoDecimals(e.nativeEvent.layout.width);
    setGridWidth(layoutWidth);
  };

  const onContentLayout = (e: LayoutChangeEvent) => {
    const width = truncateToTwoDecimals(e.nativeEvent.layout.width);
    setContentWidth(width);
  };

  return (
    <View style={[styles.container, style]} onLayout={onContainerLayout}>
      {/* 用于测量实际内容宽度的透明 View */}
      <View 
        style={styles.measureView} 
        onLayout={onContentLayout}
        pointerEvents="none"
      />
      {data.map((item, index) => {
        const isLastInRow = (index + 1) % columns === 0;
        return (
          <View
            key={index}
            style={[
              styles.itemBase,
              itemWidth ? { width: itemWidth } : null,
              !isLastInRow ? { marginRight: colGap } : null,
              { marginBottom: rowGap },
              itemStyle,
            ]}
          >
            {renderItem(item, index)}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  measureView: {
    width: '100%',
    height: 0,
    position: 'absolute',
    opacity: 0,
  },
  itemBase: {
    // width is computed
  },
});


