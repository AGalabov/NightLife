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
  backButton: {
    backgroundColor: 'transparent',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    // maxHeight: 60,
  },
});

const imageUri =
  'https://live.staticflickr.com/65535/49430673003_33755fe7a1_b.jpg';
// const oldImageUri =
//   'https://media.istockphoto.com/photos/crowd-applauding-on-a-concert-picture-id837765936?k=6&m=837765936&s=612x612&w=0&h=YSwLYY8tFq0dydZ_95oQnTent1McpBRBcoFzJ6MEo48=';

interface PageWrapperProps {
  style?: StyleProp<ViewStyle>;
  header?: 'back-navigation' | ReactElement;
  scrollable: boolean;
  children: ReactNode;
}

export function PageWrapper({
  style,
  header,
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
        {header && (
          <View style={styles.header}>
            {header === 'back-navigation' ? (
              <IconButton
                style={styles.backButton}
                color="white"
                size={30}
                icon="chevron-left"
                onPress={goBack}
              />
            ) : (
              header
            )}
          </View>
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
