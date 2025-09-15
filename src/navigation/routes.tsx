import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/Detail';
import MallScreen from '../screens/Mall';
import ScheduleScreen from '../screens/schedule';
import TickerScreen from '../screens/ticker-screen';
import SwitchScreen from '../screens/switch-screen';

const routes = [
  {
    name: 'Home',
    title: '首页',
    component: TabNavigator,
  },
  {
    name: 'Detail',
    title: '详情',
    component: DetailScreen,
    headerShown: false,
  },
  {
    name: 'Mall',
    title: '商城',
    component: MallScreen,
    headerShown: false,
  },
  {
    name: 'Schedule',
    title: '日程安排',
    component: ScheduleScreen,
  },
  {
    name: 'TickerScreen',
    title: '滚动数字',
    component: TickerScreen,
  },
  {
    name: 'SwitchScreen',
    title: '开关',
    component: SwitchScreen,
  },
]

export default routes;