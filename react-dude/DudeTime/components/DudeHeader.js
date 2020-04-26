import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import Colors from "../constants/Colors";
import RoundedPic from './RoundedPic';
import CreateButton from './CreateButton';

const deviceWidth = Dimensions.get('window').width;
const createButtonOffset = Dimensions.get('window').height - 120;
const DudeHeader = ({navigation}) => {
    user = useSelector(state => state.auth.user);

    return (
        <View style={styles.header}>
            <Text style={{fontFamily: 'beachday', fontSize: 34, color: Colors.white}}>Dudetime</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Profile")}>
                <RoundedPic size={46}
                    source={{ uri: user.picturePath }}
                />
            </TouchableOpacity>
            <CreateButton outerStyles={{top: createButtonOffset, right: 20}} onPress={()=>navigation.navigate("CreateMate")} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: Colors.grey,
        width: deviceWidth,
        justifyContent: "space-between",
        alignItems: 'center'
    },
    button: {
    },
});

export default DudeHeader;
