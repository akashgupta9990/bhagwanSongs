import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  textColor?: string;
  iconColor?: string;
  backgroundColor?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  textColor = 'rgb(238 89 30)',
  iconColor = '#ffffff',
  backgroundColor = 'rgba(0, 0, 0, 0.3)',
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (path) {
      router.push(path as any);
    }
  };

  return (
    <View style={[styles.container]}>
      {items.map((item, index) => (
        <View key={index} style={styles.breadcrumbItem}>
          {index > 0 && (
            <Ionicons
              name="chevron-forward"
              size={16}
              color={iconColor}
              style={styles.separator}
            />
          )}
          <TouchableOpacity
            onPress={() => item.path && handleNavigation(item.path)}
            disabled={!item.path}
            style={styles.itemButton}
          >
            <Text
              style={[
                styles.itemText,
                { color: textColor },
                index === items.length - 1 && styles.currentItem,
                !item.path && styles.disabledItem
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 8,
    borderRadius: 8,
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 4,
  },
  itemButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  currentItem: {
    fontWeight: 'bold',
  },
  disabledItem: {
    opacity: 0.7,
  },
});
