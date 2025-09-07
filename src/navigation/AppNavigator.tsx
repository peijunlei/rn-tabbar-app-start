import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyHeader } from '../components/Header';
import { getHeaderTitle, Header } from '@react-navigation/elements';
import routes from './routes';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // headerShown: false,
        // header: ({ options, route, back }) => (
        //   <Header
        //     {...options}
        //     back={back}
        //     title={getHeaderTitle(options, route.name)}
        //   />
        // ),
      }}>
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
    </Stack.Navigator>
  );
} 