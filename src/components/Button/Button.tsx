import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import Loading from '../Loading';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonShape = 'round';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style' | 'children'> {
  /** 按钮文本 - 与 children 二选一 */
  title?: string;
  /** 按钮子元素 - 与 title 二选一 */
  children?: React.ReactNode;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否全宽 */
  fullWidth?: boolean;
  /** 左侧图标 */
  leftIcon?: React.ReactNode;
  /** 右侧图标 */
  rightIcon?: React.ReactNode;
  /** 自定义样式 */
  style?: ViewStyle;
  /** 文本样式 - 仅在使用 title 时生效 */
  textStyle?: TextStyle;
  /** 点击事件 */
  onPress?: () => void;
}

export function Button({
  title,
  children,
  size = 'medium',
  variant = 'primary',
  shape,
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.base,
    styles[size],
    styles[variant],
    shape && styles[`${shape}Shape`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  // 如果使用 title，应用文本样式
  const textStyleCombined = title ? [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    textStyle,
  ] : undefined;

  // 渲染内容：优先使用 children，其次使用 title
  const renderContent = () => {
    if (children) {
      return children;
    }
    if (title) {
      return <Text style={textStyleCombined}>{title}</Text>;
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading && (
        <Loading size={16} />
      )}
      {!loading && leftIcon && <>{leftIcon}</>}
      {renderContent()}
      {!loading && rightIcon && <>{rightIcon}</>}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    borderColor: 'transparent',
  },

  // 尺寸样式
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    minHeight: 48,
  },

  // 变体样式
  primary: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#F2F2F7',
    borderColor: '#F2F2F7',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#007AFF',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },

  roundShape: {
    borderRadius: 999,
  },
  // 文本样式
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // 文本颜色
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
  outlineText: {
    color: '#007AFF',
  },
  ghostText: {
    color: '#007AFF',
  },
  dangerText: {
    color: '#FFFFFF',
  },

  // 状态样式
  disabled: {
    opacity: 0.5,
  },
  // 其他样式
  fullWidth: {
    width: '100%',
  },
});
