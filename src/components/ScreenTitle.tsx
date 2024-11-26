import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ScreenTitle = ({ title }: { title: string }) => {
  return (
    <Text variant="titleLarge" style={styles.title}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
});

export default ScreenTitle;
