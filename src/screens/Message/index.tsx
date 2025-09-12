import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
//@ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import { MyHeader } from '../../components/Header';
import { PullToRefresh } from '../../components/PullToRefresh';

// Mock数据接口
interface MessageItem {
  id: string;
  iconName: string;
  iconColor: string;
  title: string;
  content: string;
  time: string;
  unreadCount?: number;
}

// Mock数据
const mockMessages: MessageItem[] = [
  {
    id: '1',
    iconName: 'person-circle',
    iconColor: '#4CAF50',
    title: '张三',
    content: '你好，最近怎么样？',
    time: '10:30',
    unreadCount: 2
  },
  {
    id: '2',
    iconName: 'person-circle',
    iconColor: '#2196F3',
    title: '李四',
    content: '明天一起吃饭吧',
    time: '09:15',
    unreadCount: 1
  },
  {
    id: '3',
    iconName: 'person-circle',
    iconColor: '#FF9800',
    title: '王五',
    content: '项目进展如何？',
    time: '昨天',
    unreadCount: 0
  },
  {
    id: '4',
    iconName: 'person-circle',
    iconColor: '#9C27B0',
    title: '赵六',
    content: '周末有空吗？',
    time: '昨天',
    unreadCount: 3
  },
  {
    id: '5',
    iconName: 'person-circle',
    iconColor: '#E91E63',
    title: '孙七',
    content: '好的，没问题',
    time: '前天',
    unreadCount: 0
  }
];

// 消息项组件
const MessageItem = ({ item, onPress }: { item: MessageItem; onPress: () => void }) => (
  <TouchableOpacity style={styles.messageItem} onPress={onPress}>
    <View style={[styles.avatarContainer, { backgroundColor: item.iconColor + '20' }]}>
      <Icon name={item.iconName} size={30} color={item.iconColor} />
    </View>
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.messageFooter}>
        <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
        {/* {item.unreadCount && item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )} */}
      </View>
    </View>
  </TouchableOpacity>
);

export default function MessageScreen() {
  const handleMessagePress = (item: MessageItem) => {
    console.log('点击消息:', item.title);
    // 这里可以导航到聊天详情页面
  };

  const handleRefresh = async () => {
    // 模拟刷新数据
    console.log('开始刷新消息列表...');
    await new Promise(resolve => setTimeout(() => resolve(true), 1000)); // 模拟网络请求
    console.log('刷新完成');
  };

  const refreshConfig = {
    threshold: 80,
    maxPullDistance: 120,
    onRefresh: handleRefresh,
    enabled: true,
  };

  const renderMessageItem = ({ item }: { item: MessageItem }) => (
    <MessageItem item={item} onPress={() => handleMessagePress(item)} />
  );

  return (
    <>
      <MyHeader title="消息" showBackButton={false} />
      <PullToRefresh
        onRefresh={handleRefresh}
      >
        <FlatList
          data={mockMessages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </PullToRefresh>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContent: {
    flex: 1
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1
  },
  time: {
    fontSize: 12,
    color: '#999'
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    fontSize: 14,
    color: '#666',
    flex: 1
  },
  unreadBadge: {
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 78 // 头像宽度 + marginRight + padding
  }
}); 