import React, { ReactNode } from 'react';
import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import DismissKeyboard from './DismissKeyboard';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <View style={{ flex: 1 }}>{children}</View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default Layout;
