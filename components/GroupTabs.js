import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,

} from 'react-native';


export default function GroupTabs({ onTabChange, numOfCourts }) {
  const [value, setValue] = React.useState(0);
  const tabs = [
    { name: 'Map', badge: numOfCourts},
    { name: 'List', badge: numOfCourts }
  ];

  useEffect(() => {
    onTabChange(value);
  }, [value, onTabChange]);
  return (
    <View style={styles.container}>
      {tabs.map((item, index) => {
        const isActive = index === value;

        return (
          <View key={item.name} style={{ flex: 1 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setValue(index);
              }}>
              <View
                style={[
                  styles.item,
                  isActive && { borderBottomColor: '#6366f1' },
                ]}>
                <Text style={[styles.text, isActive && { color: '#6366f1' }]}>
                  {item.name}
                </Text>
                {item.badge && (
                  <View
                    style={[
                      styles.badge,
                      isActive && { backgroundColor: '#e0e7ff' },
                    ]}>
                    <Text
                      style={[
                        styles.badgeText,
                        isActive && { color: '#6366f1' },
                      ]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    // paddingVertical: 24,
    // paddingHorizontal: 12,
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#6b7280',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
    marginLeft: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '500',
  },
});