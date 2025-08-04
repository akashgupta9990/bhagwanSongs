import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Home',
      icon: 'home' as const,
      iconType: 'FontAwesome5' as const,
      route: '/screens/HomeScreen' as const,
    },
    {
      name: 'Audio',
      icon: 'headset' as const,
      iconType: 'Ionicons' as const,
      route: '/screens/audio/audio-menu' as const,
    },
    {
      name: 'Scriptures',
      icon: 'book-open' as const,
      iconType: 'FontAwesome5' as const,
      route: '/screens/scripture/menu' as const,
    },
    {
      name: 'Pooja',
      icon: 'fire' as const,
      iconType: 'FontAwesome5' as const,
      route: '/screens/PoojaRoomScreen' as const,
    },
    {
      name: 'Setting',
      icon: 'cog' as const,
      iconType: 'FontAwesome5' as const,
      route: '/screens/setting/menu' as const,
    },
  ];

  const getIconComponent = (iconType: string, name: any, size: number, color: string) => {
    switch (iconType) {
      case 'FontAwesome5':
        return <FontAwesome5 name={name} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      default:
        return <FontAwesome5 name={name} size={size} color={color} />;
    }
  };

  const isActive = (route: string) => {
    return pathname === route || pathname.includes(route);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={() => router.push(tab.route as any)}
          activeOpacity={0.7}
        >
          {getIconComponent(
            tab.iconType,
            tab.icon,
            20,
            isActive(tab.route) ? '#f59e42' : '#fde68a'
          )}
          <Text
            style={[
              styles.tabText,
              { color: isActive(tab.route) ? '#f59e42' : '#fde68a' }
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 69, 19, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(245, 158, 66, 0.3)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    // Use boxShadow for web compatibility
    ...Platform.select({
      web: {
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BottomNavigation;
