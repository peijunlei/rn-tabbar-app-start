import { MotiView } from 'moti';
import { View, StyleSheet } from 'react-native';
import { Easing } from 'react-native-reanimated';

interface WavesProps {
  size?: number;
  color?: string;
  waveCount?: number;
  /**
   * 每个波的延迟时间,越小越密集
   */
  delay?: number;
  children: React.ReactNode;
}

export default function Waves({ size = 100, color = '#6e01ef', waveCount = 3, delay = 500, children }: WavesProps) {
  const dot = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 2,
  }

  const duration = waveCount * delay + delay;
  return (
    <View style={[styles.waves, dot]}>
      {
        Array.from({ length: waveCount }).map((_, index) => (
          <MotiView
            key={index}
            style={[StyleSheet.absoluteFillObject, dot]}
            from={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              type: 'timing',
              duration,
              delay: index * delay,
              repeatReverse: false,
              easing: Easing.inOut(Easing.ease),
              loop: true,
            }}
          />
        ))
      }
      {children}
    </View>
  )
    ;
}


const styles = StyleSheet.create({
  waves: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});