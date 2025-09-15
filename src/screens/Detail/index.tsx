import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Alert, Image, Dimensions } from 'react-native';
import { MyHeader } from '../../components/Header';
import { Button } from '@react-navigation/elements';
import img7 from './imgs/7.png';
import img8 from './imgs/8.png';
import img9 from './imgs/9.png';
import img10 from './imgs/10.png';
import img11 from './imgs/11.png';
import img12 from './imgs/12.png';

import Animated, { 
  FadeIn, 
  FadeOut, 
  interpolate, 
  interpolateColor, 
  runOnJS, 
  SharedValue, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue,
  Extrapolate 
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;
const itemSize = width * .24;
const gap = 12;
const itemTotalSize = itemSize + gap;

const dataSource = [img7, img8, img9, img10, img11, img12];

export default function DetailScreen() {
  const scrollX = useSharedValue(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const flatListRef = useRef<Animated.FlatList<any>>(null);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / itemTotalSize;
      const newIndex = Math.round(scrollX.value);
      console.log('onScroll', newIndex, displayIndex);
      if (newIndex !== displayIndex && newIndex >= 0 && newIndex < dataSource.length) {
        runOnJS(setDisplayIndex)(newIndex);
      }
    },
  });

  // 点击切换函数
  const handleItemPress = (index: number) => {
    if (index !== displayIndex) {
      flatListRef.current?.scrollToOffset({
        offset: index * itemTotalSize,
        animated: true,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <Animated.Image
            key={displayIndex.toString()}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500).delay(500)}
            source={dataSource[displayIndex]}
            resizeMode='cover'
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <Animated.FlatList
          ref={flatListRef}
          style={{ flexGrow: 0, paddingBottom: itemSize / 2 }}
          contentContainerStyle={{
            gap,
            paddingHorizontal: (width - itemSize) / 2,
          }}
          data={dataSource}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <CorouselItem 
              imgUrl={item} 
              index={index} 
              scrollX={scrollX}
              onPress={() => handleItemPress(index)}
            />
          )}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={itemTotalSize}
          decelerationRate="fast"
        />
      </View>
    </>
  );
}

function CorouselItem({ 
  imgUrl, 
  index, 
  scrollX, 
  onPress, 
}: { 
  imgUrl: any, 
  index: number, 
  scrollX: SharedValue<number>,
  onPress: () => void,
}) {
  const styledItem = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      opacity: interpolate(scrollX.value, [index - 2, index - 1, index, index + 1, index + 2], [0.5, 0.7, 1, 0.7, 0.5]),
      borderColor: interpolateColor(scrollX.value, [index - 1, index, index + 1], ['transparent', '#fff', 'transparent']),
      transform: [
        {
          translateY: interpolate(scrollX.value, [index - 1, index, index + 1], [itemSize / 3, 0, itemSize / 3])
        },
        {
          scale: interpolate(scrollX.value, [index - 2, index - 1, index, index + 1, index + 2], [0.8, 0.9, 1, 0.9, 0.8])
        }
      ],
    }
  });
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={[
          {
            width: itemSize,
            height: itemSize,
            borderRadius: itemSize / 2,
            overflow: 'hidden',
          },
          styledItem
        ]}>
        <Image 
          source={imgUrl} 
          resizeMode='cover' 
          style={{ 
            width: '100%', 
            height: '100%',
          }} 
          key={index.toString()} 
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff' },
}); 