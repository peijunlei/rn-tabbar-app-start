import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyHeader } from '../../components/Header';
import { Button, Label, MissingIcon } from '@react-navigation/elements';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <>
      <MyHeader title="首页" showBackButton={false} />
      <View style={styles.container}>
        <Text style={styles.text}>首页</Text>
        <Button screen="Detail" params={{ userId: 'jane' }}>
          Go to Detail
        </Button>
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