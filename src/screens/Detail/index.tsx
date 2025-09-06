import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyHeader } from '../../components/Header';

export default function DetailScreen() {
  const navigation = useNavigation<any>();
  useFocusEffect(
    useCallback(() => {
      console.log('DetailScreen');
    }, [])
  );
 
  return (
    <>
      <MyHeader title="详情" showBackButton/>
      <View style={styles.container}>
        <Text style={styles.text}>这是详情页</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
}); 