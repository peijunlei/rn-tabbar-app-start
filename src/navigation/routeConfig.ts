// 路由配置数据（纯数据，不导入组件，避免循环依赖）
export interface RouteConfig {
  name: string;
  title: string;
  headerShown?: boolean;
}

export const routeConfigs: RouteConfig[] = [
  {
    name: 'Home',
    title: '首页',
  },
  {
    name: 'Detail',
    title: '壁纸',
    headerShown: false,
  },
  {
    name: 'Mall',
    title: '商城',
    headerShown: false,
  },
  {
    name: 'Schedule',
    title: '日程安排',
  },
  {
    name: 'TickerScreen',
    title: '滚动数字',
  },
  {
    name: 'SwitchScreen',
    title: '开关',
  },
  {
    name: 'WavesScreen',
    title: '波浪',
  },
  {
    name: 'Loading',
    title: 'Loading',
  },
  {
    name: 'Swipe',
    title: '滑动',
  },
  {
    name: 'Toast',
    title: 'Toast',
  },
  {
    name: 'Button',
    title: 'Button',
  },
  {
    name: 'test',
    title: 'test',
  },
];

