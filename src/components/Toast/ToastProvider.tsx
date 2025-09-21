import React, { createContext, useContext, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  FadeInDown,
  FadeOutUp,
  LinearTransition,
  FadeInUp,
  FadeOutDown,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';


const _layout = LinearTransition.springify()
type ToastConfig = {
  type?: ToastItem['type'];
  icon?: string;
};
// Toast 类型
type ToastItem = {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
  icon?: ToastConfig['icon'];
};

// Context 类型
type ToastContextType = {
  showToast: (message: string, config?: ToastConfig) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

// 单个 Toast 组件
const Toast: React.FC<{
  item: ToastItem;
  onClose: (id: number) => void;
  type?: 'success' | 'error' | 'info';
  icon?: ToastConfig['icon'];
}> = ({ item, onClose }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  console.log(item.icon)
  React.useEffect(() => {
    // 显示动画
    scale.value = withTiming(1, { duration: 200 });
    opacity.value = withTiming(1, { duration: 200 });

    const timer = setTimeout(() => {
      // 隐藏动画
      hideToast();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const hideToast = () => {
    scale.value = withTiming(0, { duration: 200 });
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(onClose)(item.id); // 动画结束后删除
    });
  };
  const bgColor =
    item.type === 'success'
      ? '#4CAF50'
      : item.type === 'error'
        ? '#F44336'
        : '#333';

  return (
    <Animated.View
      style={[styles.toast, { backgroundColor: bgColor }, animatedStyle]}
      layout={_layout}
    >
      {item.icon && <Icon name={item.icon} size={20} color='#fff' />}
      <Text style={styles.text}>{item.message}</Text>
    </Animated.View>
  );
};

// Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const showToast = useCallback((message: string, config?: ToastConfig) => {
    const id = idRef.current++;
    setToasts((prev) => [...prev, { id, message, type: config?.type, icon: config?.icon }]);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View style={styles.container} pointerEvents="box-none" >
        {toasts.map((item) => (
          <Toast key={item.id} item={item} onClose={removeToast} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center', // 居中显示
    alignItems: 'center',
    zIndex: 9999,
    gap: 16,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
  },
});
