import React from 'react';
import { Image, View } from 'react-native';

const RoundedPic = ({ source, size }) => {
    let radius = size / 2;
    if(source && source.uri) {
        return (
            <Image style={{ width: size, height: size, borderRadius: radius, margin: 5 }} source={source} />
        );
    } else {
        return (
            <Image style={{ width: size, height: size, borderRadius: radius, margin: 5, backgroundColor: "blue" }} />
        );
    }
};

export default RoundedPic;