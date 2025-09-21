import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useToast } from '@/components/Toast';
import { Button } from '@react-navigation/elements';

export default function ToastScreen() {
  const { showToast } = useToast();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>toast-screen 页面</Text>
      <Button onPress={() => showToast('Hello, world!', { type: 'info', icon: 'bookmark-outline' })}>Show info</Button>
      <Button onPress={() => showToast('Hello, world!', { type: 'success', icon: 'checkmark-circle' })}>Show success</Button>
      <Button onPress={() => showToast('Hello, world!', { type: 'error', icon: 'close-circle' })}>Show error</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
});
