import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/Detail';
import MallScreen from '../screens/Mall';
import ScheduleScreen from '../screens/schedule';

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
  },
  {
    name: 'Schedule',
    title: '日程安排',
    component: ScheduleScreen,
  },
]

export default routes;