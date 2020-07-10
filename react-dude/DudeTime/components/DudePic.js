import React from 'react';
import {Animated, TouchableOpacity } from 'react-native';

const DudePic = ({ source, size, style, active }) => {
    const scaleSize = size * 4;
    const picScale = React.useRef(new Animated.Value(0.25)).current;
    const [picZIndex, setPicZIndex] = React.useState(1);
    let radius = 200;

    const onPress = () => {
        if(active) {
            if(picScale._value === 0.25) {
                setPicZIndex(2);
                Animated.timing(picScale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: false
                }).start();
            } else {
                Animated.timing(picScale, {
                    toValue: 0.25,
                    duration: 100,
                    useNativeDriver: false       
                }).start();
                setPicZIndex(1);
            }
        }
    };
    return (
        <TouchableOpacity activeOpacity={1} style={{ height: size, width: size, alignItems: "center", justifyContent: "center", ...style, zIndex: picZIndex}} onPress={onPress}>
            {source && <Animated.Image style={{ width: scaleSize, height: scaleSize, borderRadius: radius, margin: 5, transform: [{scale: picScale}]}} source={source} />}
        </TouchableOpacity>
    );
};

export default DudePic;
