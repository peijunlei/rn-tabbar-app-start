import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import CategoryScreen from '../screens/Category';
import MessageScreen from '../screens/Message';
import ProfileScreen from '../screens/Profile';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

function getTabBarIcon(route: any, { color, size }: { color: string; size: number }) {
  let iconName;
  switch (route.name) {
    case '首页':
      iconName = 'home-outline';
      break;  
    case '分类':
      iconName = 'options-outline';
      break;
    case '消息':
      iconName = 'chatbubble-outline';
      break;
    case '我的':
      iconName = 'person-outline';
      break;
    default:
      iconName = 'ellipse-outline'; 
  }
  return <Icon name={iconName} size={size} color={color} />;
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, { color, size }),
      })}
    >
      <Tab.Screen name="首页" component={HomeScreen} />
      <Tab.Screen name="分类" component={CategoryScreen} />
      <Tab.Screen name="消息" component={MessageScreen} />
      <Tab.Screen name="我的" component={ProfileScreen} />
    </Tab.Navigator>
  );
} 