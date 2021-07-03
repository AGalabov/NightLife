import React, { ReactElement, ReactNode } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { useCustomNavigation } from '../../hooks/use-custom-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    margin: 16,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

const imageUri =
  'https://live.staticflickr.com/65535/49430673003_33755fe7a1_b.jpg';
// const oldImageUri =
//   'https://media.istockphoto.com/photos/crowd-applauding-on-a-concert-picture-id837765936?k=6&m=837765936&s=612x612&w=0&h=YSwLYY8tFq0dydZ_95oQnTent1McpBRBcoFzJ6MEo48=';

interface PageWrapperProps {
  style?: StyleProp<ViewStyle>;
  header?: 'back-navigation' | ReactElement;
  scrollable?: boolean;
  children: ReactNode;
}

export function PageWrapper({
  style,
  header,
  scrollable = false,
  children,
}: PageWrapperProps) {
  const { goBack } = useCustomNavigation();

  const hasCustomHeader = header && header !== 'back-navigation';

  const contentStyle = hasCustomHeader
    ? { ...styles.content, marginTop: 0 }
    : styles.content;

  return (
    <>
      {hasCustomHeader && header}
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          // TODO: Scrolling problem
          source={{
            uri: imageUri,
          }}>
          {header === 'back-navigation' && (
            <View style={styles.transparent}>
              <IconButton
                style={styles.transparent}
                color="white"
                size={30}
                icon="chevron-left"
                onPress={goBack}
              />
            </View>
          )}
          {scrollable ? (
            <ScrollView style={[contentStyle, style]}>{children}</ScrollView>
          ) : (
            <View style={[contentStyle, style]}>{children}</View>
          )}
        </ImageBackground>
      </View>
    </>
  );
}
