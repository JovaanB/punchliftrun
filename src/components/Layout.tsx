import React, { ReactNode } from 'react'
import { Text, StyleSheet, SafeAreaView } from 'react-native'

const Layout = ({ children }: {
    children: ReactNode;
}) => {
    return (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    }
})

export default Layout;