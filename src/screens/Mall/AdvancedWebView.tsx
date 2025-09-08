import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  RefreshControl, 
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';

const { height: screenHeight } = Dimensions.get('window');

interface AdvancedWebViewProps {
  url: string;
  title?: string;
}

export default function AdvancedWebView({ url }: AdvancedWebViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [webViewHeight, setWebViewHeight] = useState(screenHeight);
  const webViewRef = useRef<WebView>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setRefreshing(false);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    setLoading(false);
    setRefreshing(false);
    setError(true);
    
    if (nativeEvent.code === -1022) {
      Alert.alert(
        '连接失败',
        '无法连接到服务器，请检查网络连接或稍后重试。',
        [
          { text: '重试', onPress: () => setError(false) },
          { text: '确定', style: 'cancel' }
        ]
      );
    }
  };

  const handleNavigationStateChange = (navState: any) => {
    // 可以在这里处理导航状态变化
    console.log('Navigation state changed:', navState);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
  };

  // 下拉刷新处理
  const onRefresh = () => {
    setRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  // 处理 WebView 消息，获取页面高度
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'pageLoaded' && data.height) {
        setWebViewHeight(Math.max(data.height, screenHeight));
      }
    } catch (parseError) {
      console.log('收到网页消息:', event.nativeEvent.data);
    }
  };

  // 注入 JavaScript 获取页面高度
  const injectedJavaScript = `
    // 获取页面高度并发送给 React Native
    function getPageHeight() {
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'pageLoaded',
        height: height,
        url: window.location.href,
        title: document.title
      }));
    }
    
    // 页面加载完成后获取高度
    if (document.readyState === 'complete') {
      getPageHeight();
    } else {
      window.addEventListener('load', getPageHeight);
    }
    
    // 监听页面内容变化
    const observer = new MutationObserver(getPageHeight);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
    
    true;
  `;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>加载失败</Text>
        <Text style={styles.errorMessage}>
          无法连接到商城页面，请检查网络连接
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>重试</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>正在加载商城...</Text>
        </View>
      )}
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
            title="下拉刷新"
            titleColor="#666"
            colors={['#007AFF']}
            progressBackgroundColor="#fff"
          />
        }
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
      >
        <View style={[styles.webViewContainer, { height: webViewHeight }]}>
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={styles.webView}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            onNavigationStateChange={handleNavigationStateChange}
            onMessage={handleMessage}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode="compatibility"
            userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('HTTP error: ', nativeEvent);
            }}
            // 禁用 WebView 自身的滚动，使用外层 ScrollView
            scrollEnabled={false}
            // 禁用 WebView 的下拉刷新，使用外层 ScrollView 的
            pullToRefreshEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  webViewContainer: {
    width: '100%',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
