import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MyHeader } from '../../components/Header';
import Animated, { FadeInDown, FadeOut, FadeOutUp, LinearTransition, useSharedValue, withSpring } from 'react-native-reanimated';
import { Pressable, ScrollView, Switch } from 'react-native-gesture-handler';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const _space = 10
const _color = '#ececec'
const _borderRadius = 16
const _startHour = 8



const _damping = 14
const _entering = FadeInDown.springify().damping(_damping)
const _exiting = FadeOut.springify().damping(_damping)
const _layout = LinearTransition.springify().damping(_damping)

function Day({ day }: { day: typeof days[number] }) {
  const [isEnabled, setIsEnabled] = useState(false)
  return (
    <View style={[styles.day, {
      backgroundColor: isEnabled ? 'transparent' : _color
    }]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text>{day}</Text>
        <Switch
          value={isEnabled}
          onValueChange={(value) => setIsEnabled(value)}
          trackColor={{ true: '#09c' }}
        />

      </View>
      {
        isEnabled && (
          <DayBlock />
        )
      }
    </View>
  )
}

function DayBlock() {
  const [hours, setHours] = useState<number[]>([_startHour])
  return (
    <Animated.View
      entering={_entering}
      exiting={_exiting}
      style={{
        gap: _space,
      }}>
      {
        hours.map((hour, index) => (
          <Animated.View
            key={`${hour}-${index}`}
            entering={_entering}
            layout={_layout}
            exiting={_exiting}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: _space / 2,
            }}>
            <Text>From:</Text>
            <HourBlock hour={hour} />
            <Text>To:</Text>
            <HourBlock hour={hour + 1} />
            <Pressable
              onPress={() => {
                setHours(hours.filter((h) => h !== hour))
              }}
            >
              <View style={{
                aspectRatio: 1,
                height: 24,
                backgroundColor: _color,
                borderRadius: _borderRadius,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon name="trash" size={16} color="#666" />
              </View>
            </Pressable>
          </Animated.View>
        ))
      }
      <Pressable
        onPress={() => {
          if (hours.length === 0) {
            setHours([_startHour])
            return
          }
          setHours([...hours, hours[hours.length - 1] + 1])
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: _color,
          padding: _space / 2,
          gap: _space / 2,
          borderRadius: _borderRadius / 2,
        }}>
          <Icon name="add" size={16} color="#333" />
          <Text style={{ fontSize: 14, color: '#333' }}>Add More</Text>
        </View>
      </Pressable>
    </Animated.View>

  )
}

function HourBlock({ hour }: { hour: number }) {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: _color,
      borderRadius: _borderRadius / 2,
      paddingVertical: _space / 2,
    }}>
      <Text>
        {
          hour < 10 ? `0${hour}:00` : `${hour}:00`
        }
        {
          hour > 11 && hour < 24 ? 'PM' : 'AM'
        }
      </Text>
    </View>
  )
}

export default function ScheduleScreen() {

  return (
    <>
      <MyHeader title="日程安排" showBackButton={false} />
      <View style={styles.container} >
        {days.map((day, index) => <Day key={`${day}-${index}`} day={day} />)}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: _space, gap: _space, backgroundColor: '#fff' },
  day: {
    gap: _space,
    flexDirection: 'column',
    padding: _space,
    borderWidth: 1,
    borderColor: _color,
    borderRadius: _borderRadius,
  },
}); 