import { Swipeable } from '@/components/Swipe';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SwipeScreen() {
  // 渲染右侧操作按钮
  const renderRightActions = () => {
    return (
      <View style={styles.action}>
        <Text style={{ color: '#fff' }}>删除</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.item}>
          <Text style={styles.itemText}>这是一个可以左滑的Item</Text>
        </View>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  action: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },

});
