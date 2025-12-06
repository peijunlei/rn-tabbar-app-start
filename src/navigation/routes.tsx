import React from 'react';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/Detail';
import MallScreen from '../screens/Mall';
import ScheduleScreen from '../screens/schedule';
import TickerScreen from '../screens/ticker-screen';
import SwitchScreen from '../screens/switch-screen';
import WavesScreen from '../screens/waves-screen';
import LoadingScreen from '../screens/Loading';
import SwipeScreen from '../screens/Swipe';
import ToastScreen from '../screens/toast-screen';
import ButtonScreen from '../screens/button-screen';
import testScreen from '../screens/test';
import { routeConfigs } from './routeConfig';

// 组件映射表
const componentMap: Record<string, React.ComponentType<any>> = {
  Home: TabNavigator,
  Detail: DetailScreen,
  Mall: MallScreen,
  Schedule: ScheduleScreen,
  TickerScreen: TickerScreen,
  SwitchScreen: SwitchScreen,
  WavesScreen: WavesScreen,
  Loading: LoadingScreen,
  Swipe: SwipeScreen,
  Toast: ToastScreen,
  Button: ButtonScreen,
  test: testScreen,
};

// 组合路由配置和组件
const routes = routeConfigs.map((config) => ({
  ...config,
  component: componentMap[config.name],
}));

export default routes;