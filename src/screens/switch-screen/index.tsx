import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MyHeader } from '../../components/Header';
import Switch from '../../components/Switch';

export default function SwitchScreen() {
  const [basicSwitch, setBasicSwitch] = useState(true);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Switch
        value={basicSwitch}
        width={100}
        height={50}
        onValueChange={setBasicSwitch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
});