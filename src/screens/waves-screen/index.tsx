import Waves from '@/components/Waves';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

export default function WavesScreen() {
  return (
    <View style={styles.container}>
      <Waves size={100} delay={300} waveCount={5} color="#222">
        <Icon name="beer-outline" size={40} color="#fff" />
      </Waves>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
});
