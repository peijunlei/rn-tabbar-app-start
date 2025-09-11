import React from 'react';
import { Header, HeaderOptions, Layout } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedbackProps } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
type Props = HeaderOptions & {
  showBackButton?: boolean;
  /**
   * Options for the back button.
   */
  back?: {
    /**
     * Title of the previous screen.
     */
    title: string | undefined;
    /**
     * The `href` to use for the anchor tag on web
     */
    href: string | undefined;
  };
  /**
   * Whether the header is in a modal
   */
  modal?: boolean;
  /**
   * Layout of the screen.
   */
  layout?: Layout;
  /**
   * Title text for the header.
   */
  title: string;
  /**
   * 返回按钮点击事件
   */
  onBackPress?: () => void;
};


export function MyHeader(props: Props) {
  const { showBackButton = true, onBackPress } = props;
  const navigation = useNavigation<any>();
  // return null
  return (
    <Header
      {...props}
      headerTitleAlign='center'
      headerLeft={showBackButton ? () => {
        return (
          <TouchableOpacity onPress={() => onBackPress ? onBackPress() : navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={props.headerTintColor} />
          </TouchableOpacity>
        )
      } : undefined}
    />
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
  },
});
