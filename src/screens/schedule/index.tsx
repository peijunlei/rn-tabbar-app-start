import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { MyHeader } from '../../components/Header';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp, FadeOut, FadeOutDown, FadeOutLeft, FadeOutRight, FadeOutUp, interpolateColor, LinearTransition, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { FlatList, Pressable, ScrollView } from 'react-native-gesture-handler';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import Switch from '../../components/Switch';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const _space = 10
const _color = '#ececec'
const _borderRadius = 16
const _startHour = 8



const _damping = 16
// hour block entering
const _entering = FadeInLeft.springify().damping(_damping)
const _exiting = FadeOutRight.springify().damping(_damping)
// day block entering
const _dayEntering = FadeIn.springify().damping(_damping)
const _dayExiting = FadeOut.springify().damping(_damping)

const _layout = LinearTransition.springify().damping(_damping)

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity)
function Day({ day }: { day: typeof days[number] }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const bgColor = useSharedValue(_color)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    }
  })
  return (
    <Animated.View layout={_layout}>
      <Animated.View
        style={[styles.day, animatedStyle]}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text>{day}</Text>
          <Switch
            value={isEnabled}
            onValueChange={(value) => {
              setIsEnabled(value)
              bgColor.value = withTiming(value ? 'transparent' : _color)
            }}
            activeColor="#333"
          />

        </View>
        {
          isEnabled && (
            <Animated.View layout={_layout} exiting={_dayExiting} entering={_dayEntering}>
              <DayBlock />
            </Animated.View>
          )
        }
      </Animated.View>
    </Animated.View>
  )
}

function DayBlock() {
  const [hours, setHours] = useState<number[]>([_startHour])
  return (
    <View
      style={{ gap: _space }}>
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setHours(hours.filter((h) => h !== hour))
              }}
            >
              <View style={{
                padding: _space / 2,
                backgroundColor: _color,
                borderRadius: _borderRadius,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon name="trash" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))
      }
      <AnimatedPressable
        activeOpacity={0.8}
        entering={_entering}
        exiting={_exiting}
        layout={_layout}
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
      </AnimatedPressable>
    </View>

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
      <FlatList
        contentContainerStyle={{ paddingBottom: _space }}
        style={styles.container}
        data={days}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <Day key={`${item}-${index}`} day={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: _space, gap: _space, backgroundColor: '#fff' },
  day: {
    gap: _space,
    marginBottom: _space,
    flexDirection: 'column',
    padding: _space,
    borderWidth: 1,
    borderColor: _color,
    borderRadius: _borderRadius,
  },
}); 