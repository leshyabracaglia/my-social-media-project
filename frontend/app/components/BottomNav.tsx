import * as React from 'react';
import { BottomNavigation, Icon, Text } from 'react-native-paper';
import FeedScreen from '../Feed';
import ProfileScreen from '../Profile';
import SettingsScreen from '../Settings';
import { TouchableOpacity } from 'react-native';

const FeedRoute = () => <FeedScreen />;
const ProfileRoute = () => <ProfileScreen />;
const SettingsRoute = () => <SettingsScreen />;

const NAVBAR_HEIGHT = 60;

export default function BottomNav() {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'feed', title: 'Feed', focusedIcon: 'heart' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-star' },
    { key: 'settings', title: 'Settings', focusedIcon: 'cog-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,
    profile: ProfileRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation<{ key: string; title: string; focusedIcon: string }>
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#6622CC',
        height: NAVBAR_HEIGHT,
      }}
      activeColor="white"
      inactiveColor="#6622CC"
      style={{ backgroundColor: '#C1B8A6' }}
      labeled={false}
      renderTouchable={({ route, onPress }) => {
        const isActive = index === routes.findIndex((r) => r.key === route.key);
        return (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
              height: NAVBAR_HEIGHT,
              backgroundColor: isActive ? '#6622CC' : 'white',
            }}
            className="flex w-1/3 items-center justify-center p-0"
          >
            <Text>
              <Icon
                source={route.focusedIcon}
                size={35}
                color={isActive ? 'white' : '#6622CC'}
              />
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
