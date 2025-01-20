import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import FeedScreen from '../Feed';
import ProfileScreen from '../Profile';
import SettingsScreen from '../Settings';

const FeedRoute = () => <FeedScreen />;
const ProfileRoute = () => <ProfileScreen />;
const SettingsRoute = () => <SettingsScreen />;

export default function BottomNav() {
  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState([
    { key: 'feed', title: 'Feed', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'profile', title: 'Profile', focusedIcon: 'album' },
    { key: 'settings', title: 'Settings', focusedIcon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    profile: ProfileRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};