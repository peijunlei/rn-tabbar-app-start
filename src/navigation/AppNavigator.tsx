import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyHeader } from '../components/Header';
import { getHeaderTitle, Header } from '@react-navigation/elements';
import routes from './routes';
import ModalScreen from '../modal-screen';
import LoginModal from '../screens/LoginModal';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Group>
        {
          routes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={{ title: route.title, headerShown: route.name === 'Home' ? false : true }}
            />
          ))
        }
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
          name="Modal" 
          component={ModalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LoginModal" 
          component={LoginModal}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
} 