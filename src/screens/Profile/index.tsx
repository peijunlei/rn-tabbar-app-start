import React, { useCallback, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { MyHeader } from '../../components/Header';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  // 登录状态管理
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 模拟用户数据
  const userInfo = {
    avatar: 'https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=用户',
    nickname: '小明',
    level: 'VIP会员',
    points: 1280
  };

  // 未登录时的菜单项
  const guestMenuItems = [
    { 
      icon: 'log-in-outline', 
      title: '登录', 
      subtitle: '登录后享受更多功能',
      onPress: () => handleLogin()
    },
    { 
      icon: 'person-add-outline', 
      title: '注册', 
      subtitle: '创建新账户',
      onPress: () => Alert.alert('提示', '注册功能')
    },
    { 
      icon: 'help-circle-outline', 
      title: '帮助与反馈', 
      subtitle: '常见问题',
      onPress: () => Alert.alert('提示', '帮助功能')
    },
    { 
      icon: 'information-circle-outline', 
      title: '关于我们', 
      subtitle: '版本信息',
      onPress: () => Alert.alert('提示', '关于我们功能')
    }
  ];

  // 已登录时的菜单项
  const userMenuItems = [
    { 
      icon: 'person-outline', 
      title: '个人信息', 
      subtitle: '编辑个人资料',
      onPress: () => Alert.alert('提示', '个人信息功能')
    },
    { 
      icon: 'settings-outline', 
      title: '设置', 
      subtitle: '应用设置',
      onPress: () => Alert.alert('提示', '设置功能')
    },
    { 
      icon: 'help-circle-outline', 
      title: '帮助与反馈', 
      subtitle: '常见问题',
      onPress: () => Alert.alert('提示', '帮助功能')
    },
    { 
      icon: 'information-circle-outline', 
      title: '关于我们', 
      subtitle: '版本信息',
      onPress: () => Alert.alert('提示', '关于我们功能')
    }
  ];

  // 登录处理 - 跳转到登录模态框
  const handleLogin = () => {
    navigation.navigate('LoginModal');
  };

  // 退出登录处理
  const handleLogout = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        { text: '确定', style: 'destructive', onPress: () => {
          setIsLoggedIn(false);
          Alert.alert('提示', '已退出登录');
        }}
      ]
    );
  };

  // 根据登录状态选择菜单
  const menuItems = isLoggedIn ? userMenuItems : guestMenuItems;
  useFocusEffect(
    useCallback(() => {
      console.log('Profile useFocusEffect');
    }, [])
  );
  return (  
    <SafeAreaView style={styles.safeArea}>
      <MyHeader title="我的" showBackButton={false}/>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {isLoggedIn ? (
          // 已登录状态 - 显示用户信息
          <>
            {/* 用户信息卡片 */}
            <View style={styles.userCard}>
              <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.nickname}>{userInfo.nickname}</Text>
                <Text style={styles.level}>{userInfo.level}</Text>
                <View style={styles.pointsContainer}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.points}>积分: {userInfo.points}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Icon name="create-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // 未登录状态 - 显示登录提示
          <View style={styles.guestCard}>
            <View style={styles.guestIconContainer}>
              <Icon name="person-circle-outline" size={80} color="#CCC" />
            </View>
            <Text style={styles.guestTitle}>欢迎使用</Text>
            <Text style={styles.guestSubtitle}>登录后享受更多功能</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>立即登录</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 功能菜单 */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  <Icon name={item.icon} size={24} color="#4A90E2" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 退出登录按钮 - 只在已登录时显示 */}
        {isLoggedIn && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>退出登录</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  // 已登录状态样式
  userCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    color: '#4A90E2',
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
  },
  // 未登录状态样式
  guestCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guestIconContainer: {
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  // 通用样式
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4444',
    fontWeight: '500',
  },
}); 