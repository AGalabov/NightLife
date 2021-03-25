import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export function ProfileContent() {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
          size={50}
        />
        <Title style={styles.title}>Dawid Urbaniak</Title>
        <Caption style={styles.caption}>@trensik</Caption>
        <View style={styles.row}>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>
              202
            </Paragraph>
            <Caption style={styles.caption}>Following</Caption>
          </View>
          <View style={styles.section}>
            <Paragraph style={[styles.paragraph, styles.caption]}>
              159
            </Paragraph>
            <Caption style={styles.caption}>Followers</Caption>
          </View>
        </View>
      </View>
      <Drawer.Section style={styles.drawerSection}>
        <Button icon="account-outline">Profile</Button>
        <Button icon="tune">Preferences</Button>
        <Button icon="bookmark-outline">Bookmarks</Button>
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <TouchableRipple onPress={() => {}}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.preference}>
            <Text>RTL</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </View>
  );
}
