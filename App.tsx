import React from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ToastProvider } from './src/components/Toast';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
