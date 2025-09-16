


import React, { useRef, useCallback, useState, useEffect } from 'react';
import WebView from 'react-native-webview';
import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native';
import { MyHeader } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import storage from '@/utils/storage';
import { mockLogin } from '@/utils/kit';
import cache from '@/utils/cache';

function MallScreen() {

  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [pageTitle, setPageTitle] = useState('商城');
  const isLoadEndRef = useRef(false);
  const webViewRef = useRef<WebView>(null);
  const navigation = useNavigation();

  // 注入的 JavaScript 代码，用于监听 SPA 路由变化
  const injectedJavaScript = `
    (function() {
      function sendTitle(title) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'title',
          title: title
        }));
      }
      // 监听 title 标签变化
      const titleElement = document.querySelector('title');
      if (titleElement) {
        const titleObserver = new MutationObserver(function(mutations) {
          sendTitle(document.title);
        });
        titleObserver.observe(titleElement, {
          childList: true,
          characterData: true
        });
      }
    })();
    true;
  `;

  const handleLoadEnd = useCallback(() => {
    if (isLoadEndRef.current) {
      return;
    }
    isLoadEndRef.current = true;
    console.log('onLoadEnd 触发');
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
  }, []);

  // 处理来自 WebView 的消息
  const handleMessage = useCallback(async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      switch (data.type) {
        case 'title':
          setPageTitle(data.title);
          break;
        case 'navigate':
          navigation.navigate(data.params.name);
          break;
        case "checkLogin":
          const res = await storage.getItem(cache.USER_INFO);
          if (data.callbackId) {
            const resp = {
              callbackId: data.callbackId,
              data: res
            };
            // 向webview发送消息
            webViewRef?.current?.postMessage(JSON.stringify(resp));
          }
          break;
        default:
          break
      }
    } catch (error) {
      console.log('解析 WebView 消息失败:', error);
    }
  }, []);

  // 处理 WebView 导航状态变化
  const handleNavigationStateChange = useCallback((navState: any) => {
    console.log('=== 导航状态变化 ===');
    console.log('canGoBack:', navState.canGoBack);
    setCanGoBack(navState.canGoBack);
  }, []);

  // 处理返回按钮
  const handleBackPress = useCallback(() => {
    console.log('webView 是否可以返回', canGoBack);
    if (canGoBack && webViewRef.current) {
      // 如果 WebView 可以返回，则返回 WebView 内部页面
      webViewRef.current.goBack();
      return; // 阻止默认返回行为
    }
    // 如果 WebView 不能返回，则返回上一级页面
    navigation.goBack();
  }, [canGoBack, navigation]);


  return (
    <View style={styles.webViewContainer}>
      <MyHeader
        title={pageTitle}
        showBackButton
        onBackPress={handleBackPress}
      />
      <WebView
        ref={webViewRef}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        source={{ uri: 'http://192.168.1.102:10086/pages/index/index' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webView}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      )}
    </View>
  );
}
export default MallScreen;
const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});