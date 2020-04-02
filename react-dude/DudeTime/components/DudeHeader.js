import React from 'react';
import { Button, Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from "../constants/Colors";
import Constants from 'expo-constants';
import DudePic from "./DudePic";
import * as Font from 'expo-font';

const deviceWidth = Dimensions.get('window').width;
const DudeHeader = ({pic}) => {
    return (
        <View style={styles.header}>
            <Text style={{fontFamily: 'beachday', fontSize: 34, color: Colors.white}}>Dudetime</Text>
            <DudePic size={44}
                source={{ uri: pic }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 0,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: Colors.grey,
        alignSelf: 'stretch',
        width: deviceWidth,
        height: 80,
        justifyContent: "space-between",
        alignItems: 'center'
    },
});

export default DudeHeader;
