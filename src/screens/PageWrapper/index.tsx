import React, { ReactNode } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    margin: 16,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

const imageUri =
  'https://live.staticflickr.com/65535/49430673003_33755fe7a1_b.jpg';
// const oldImageUri =
//   'https://media.istockphoto.com/photos/crowd-applauding-on-a-concert-picture-id837765936?k=6&m=837765936&s=612x612&w=0&h=YSwLYY8tFq0dydZ_95oQnTent1McpBRBcoFzJ6MEo48=';

interface PageWrapperProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function PageWrapper({ style, children }: PageWrapperProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: imageUri,
        }}>
        <Text />
        <ScrollView style={[styles.content, style]}>{children}</ScrollView>
      </ImageBackground>
    </View>
  );
}
