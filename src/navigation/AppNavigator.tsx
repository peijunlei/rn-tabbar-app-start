import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyHeader } from '../components/Header';
import { getHeaderTitle, Header } from '@react-navigation/elements';
import routes from './routes';
import ModalScreen from '../modal-screen';

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
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
} 