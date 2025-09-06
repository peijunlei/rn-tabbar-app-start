import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyHeader } from '../../components/Header';

export default function MessageScreen() {
  return (  
    <>
      <MyHeader title="消息" showBackButton={false}/>
      <View style={styles.container}>
        <Text style={styles.text}>消息</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
}); 