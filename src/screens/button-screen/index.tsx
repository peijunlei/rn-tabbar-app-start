import { Button } from '@/components';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function buttonScreen() {
  return (
    <View style={styles.container}>
      <Button title='Button' size='small' />
      <Button title='Button' size='medium' />
      <Button title='Button' size='large' />

      <Button title='Button' fullWidth />
      <Button title='Button' shape='round' />

      <Button title='Button' variant='primary' />
      <Button title='Button' variant='secondary' />
      <Button title='Button' variant='outline' />
      <Button title='Button' variant='ghost' />
      <Button title='Button' variant='danger' />

      <Button title='Button' loading />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', gap: 16 },
  text: { fontSize: 22, fontWeight: 'bold' },
});
