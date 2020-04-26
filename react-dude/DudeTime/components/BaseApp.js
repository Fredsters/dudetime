import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import Colors from "../constants/Colors";
import {persistor} from "../redux/store";

const BaseApp = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <AppNavigator screenProps={{
                persistor: persistor
            }}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey,
    },
});

export default BaseApp;