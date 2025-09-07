import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { MyHeader } from '../../components/Header';
import { Button } from '@react-navigation/elements';

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
        <Button onPress={() => navigation.navigate('Modal')}>
          Go to Modal
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
}); 