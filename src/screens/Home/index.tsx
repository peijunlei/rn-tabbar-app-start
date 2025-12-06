import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyHeader } from '../../components/Header';
import { routeConfigs } from '@/navigation/routeConfig';
import { Button } from '@/components';
import { ScrollView } from 'react-native-gesture-handler';
export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const list = routeConfigs.filter((item) => item.name !== 'Home');
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {
        list.map((item) => (
          <Button key={item.name} onPress={() => navigation.navigate(item.name)} title={item.title} style={{ marginBottom: 8 }} />
        ))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', },
}); 