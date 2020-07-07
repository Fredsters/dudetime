import React from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Colors from "../constants/Colors";
import { Entypo } from '@expo/vector-icons'
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CreateButton = ({outerStyles, onPress}) => {
    return (
        <AnimatedTouchableOpacity style={[styles.createButton, outerStyles]} onPress={onPress}>
            <Entypo name="plus" size={30} color={Colors.white} style={{paddingTop: 2}} />
        </AnimatedTouchableOpacity >
    );
};
const styles = StyleSheet.create({
    createButton: {
        position: "absolute",
        backgroundColor: Colors.green,
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 80,
        elevation: 17,
        zIndex: 4,
        shadowRadius: 4,
        shadowColor: Colors.black,
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.9
    }
});

export default CreateButton;