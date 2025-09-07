import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/Detail';

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
  },
]

export default routes;