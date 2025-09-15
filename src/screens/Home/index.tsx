import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyHeader } from '../../components/Header';
import { Button, Label, MissingIcon } from '@react-navigation/elements';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>首页</Text>
        <Button screen="Detail" params={{}}>
          Go to Detail
        </Button>
        <Button onPress={() => navigation.navigate('Modal')}>
          Go to Modal
        </Button>
        <Button screen="Mall" params={{}}>
          Go to Mall
        </Button>
        <Button screen="Schedule" params={{}}>
          Go to Schedule
        </Button>
        <Button screen="TickerScreen" params={{}}>
          滚动数字
        </Button>
        <Button screen="SwitchScreen" params={{}}>
          开关
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
}); 