import { View, Text } from 'react-native'
import Ticker from '../../components/Ticker'
import { useState } from 'react'
import { Button } from '@react-navigation/elements'



export default function TickerScreen() {
  const [number, setNumber] = useState(854971)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
      <Ticker number={number} fontSize={50} />
      <Button onPress={() => setNumber(Math.floor(Math.random() * 100000))}>
        随机数字
      </Button>
    </View>
  )
}