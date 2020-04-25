import React from 'react';
import { Button, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors";
import RoundedPic from './RoundedPic';

const deviceWidth = Dimensions.get('window').width;
const DudeHeader = ({pic, navigation}) => {
    return (
        <View style={styles.header}>
            <Text style={{fontFamily: 'beachday', fontSize: 34, color: Colors.white}}>Dudetime</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Profile")}}>
                <RoundedPic size={44}
                    source={{ uri: pic }}
                />
            </TouchableOpacity>
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
    button: {
    },
});

export default DudeHeader;
