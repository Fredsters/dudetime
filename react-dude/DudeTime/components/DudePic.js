import React from 'react';
import {Animated, TouchableOpacity } from 'react-native';

const DudePic = ({ source, size, style, active }) => {
    const scaleSize = size;
    const picScale = React.useRef(new Animated.Value(scaleSize)).current;
    const [picZIndex, setPicZIndex] = React.useState(1);
    let radius = 200;

    const onPress = () => {
        if(active) {
            if(picScale._value === scaleSize) {
                setPicZIndex(2);
                Animated.timing(picScale, {
                    toValue: scaleSize*4,
                    duration: 100
                }).start();
            } else {
                Animated.timing(picScale, {
                    toValue: scaleSize,
                    duration: 100                
                }).start();
                setPicZIndex(1);
            }
        }
    };

    return (
        <TouchableOpacity activeOpacity={1} style={{ height: size, width: size, alignItems: "center", justifyContent: "center", ...style, zIndex: picZIndex}} onPress={onPress}>
            <Animated.Image style={{ width: picScale, height: picScale, borderRadius: radius, margin: 5}} source={source} />
        </TouchableOpacity>
    );
};

export default DudePic;
