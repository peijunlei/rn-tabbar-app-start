// 刷新状态枚举
export enum RefreshState {
  IDLE = 'idle',
  PULLING = 'pulling',
  REFRESHING = 'refreshing',
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