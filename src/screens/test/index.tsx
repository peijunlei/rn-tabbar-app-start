import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Grid } from '../../components/Grid';

export default function TestScreen() {
  const data = Array.from({ length: 11 }).map((_, i) => i);
  return (
    <Grid
      style={styles.container}
      data={data}
      gap={20}
      renderItem={(item) => (
        <View
          style={styles.item}
        >
          <Text>{item}</Text>
        </View>
      )}
      columns={3}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%',paddingHorizontal: 10, backgroundColor: 'blue' },
  list: {
    backgroundColor: 'blue',
  },
  item: {
    height: 100,
    backgroundColor: 'red',
  },
  scrollView: {
    width: '100%',
    height: 100,
    backgroundColor: 'green',

  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  item2: {
    width: 80, // 使用固定宽度而不是百分比
    height: 80,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
