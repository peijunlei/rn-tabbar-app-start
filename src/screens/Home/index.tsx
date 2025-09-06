import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MyHeader } from '../../components/Header';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <>  
      <MyHeader title="首页" showBackButton={false}/>
      <View style={styles.container}>
        <Text style={styles.text}>首页</Text>
        <Button title="进入详情页" onPress={() => navigation.navigate('Detail')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: { fontSize: 22, fontWeight: 'bold' },
}); 