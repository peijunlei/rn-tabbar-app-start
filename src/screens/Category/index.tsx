import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MyHeader } from '../../components/Header';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function CategoryScreen() {
  const width = useSharedValue(100);
  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <>
      <MyHeader title="分类" showBackButton={false} />
      <Animated.View
        style={{
          width: width,
          height: 100,
          borderRadius: 10,
          backgroundColor: 'violet',
        }}
      >
      </Animated.View>
      <Button onPress={handlePress} title="Click me" />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
}); 