// 刷新状态枚举
export enum RefreshState {
  /** 初始状态 */
  IDLE = 'idle',
  /** 下拉中 */
  PULLING = 'pulling',
  /** 刷新中 */
  REFRESHING = 'refreshing',
  /** 释放中 */
  RELEASING = 'releasing',
}

// 容器组件属性
export interface PullToRefreshContainerProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 下拉刷新回调 */
  onRefresh: () => Promise<void>;
  /** 下拉刷新阈值 */
  threshold?: number;
}
export interface PullToRefreshIndicatorProps {
  state: RefreshState;
  progress: number;
}