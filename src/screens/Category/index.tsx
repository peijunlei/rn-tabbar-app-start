import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyHeader } from '../../components/Header';

export default function CategoryScreen() {
  return (
    <>
      <MyHeader title="分类" showBackButton={false}/>
      <View style={styles.container}>
        <Text style={styles.text}>分类</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
}); 