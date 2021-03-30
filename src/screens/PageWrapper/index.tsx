import React, { ReactNode } from 'react';
import {
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
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
});

const imageUri =
  'https://live.staticflickr.com/65535/49430673003_33755fe7a1_b.jpg';
// const oldImageUri =
//   'https://media.istockphoto.com/photos/crowd-applauding-on-a-concert-picture-id837765936?k=6&m=837765936&s=612x612&w=0&h=YSwLYY8tFq0dydZ_95oQnTent1McpBRBcoFzJ6MEo48=';

interface PageWrapperProps {
  style?: StyleProp<ViewStyle>;
  withBackButton: boolean;
  scrollable: boolean;
  children: ReactNode;
}

export function PageWrapper({
  style,
  withBackButton,
  scrollable,
  children,
}: PageWrapperProps) {
  const { goBack } = useCustomNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: imageUri,
        }}>
        {withBackButton && (
          <IconButton
            style={styles.backButton}
            color="white"
            size={30}
            icon="chevron-left"
            onPress={goBack}
          />
        )}
        {scrollable ? (
          <ScrollView style={[styles.content, style]}>{children}</ScrollView>
        ) : (
          <View style={[styles.content, style]}>{children}</View>
        )}
      </ImageBackground>
    </View>
  );
}
