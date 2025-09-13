import { MotiView } from 'moti';
import { useState } from 'react';
import { View, Text, TextProps } from 'react-native'


interface TickerProps {
  format?: 'currency' | 'number';
  number: number;
  fontSize?: number;
}

const numbers = [...Array(10).keys()]

interface TickerListProps {
  index: number;
  number: number;
  fontSize: number;
}

const _stagger = 50;

function Tick({ children, fontSize, style, ...rest }: TextProps & { fontSize: number }) {
  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontSize,
          lineHeight: fontSize * 1.2,
          fontWeight: 'bold',
          fontVariant: ['tabular-nums'],
        }
      ]}>{children}</Text>
  )
}
function TickerList({ index, number, fontSize }: TickerListProps) {
  const height = fontSize * 1.2
  return (
    <View
      style={{
        height,
        overflow: 'hidden',
      }}>
      <MotiView
        animate={{
          translateY: -height * number,
        }}
        transition={{
          delay: index * _stagger,
          damping: 80,
          stiffness: 200,
        }}
      >
        {numbers.map((num, index) => (
          <Tick key={index} fontSize={fontSize}>{num}</Tick>
        ))}
      </MotiView>
    </View>
  )
}
export default function Ticker({ number, fontSize = 40, format = 'number' }: TickerProps) {
  //   中国 1234567890
  let inlNumber: string | number = number
  if (format === 'currency') {
    inlNumber = new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
    }).format(number)
  }
  const splitNumber = inlNumber.toString().split('')
  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', }} >
        {splitNumber.map((item, index) => {
          if (!isNaN(parseFloat(item))) {
            return (
              <TickerList
                key={index}
                index={index}
                number={parseFloat(item)}
                fontSize={fontSize}
              />
            )
          } else {
            return (
              <Tick key={index} fontSize={fontSize} style={{ opacity: .3 }}>{item}</Tick>
            )
          }
        })}
      </View>
    </View>
  )
}