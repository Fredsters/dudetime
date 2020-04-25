import React from 'react';
import { Image, Text, View } from 'react-native';

const RoundedPic = ({ source, size }) => {
    let radius = size / 2;
    return (
        <Image style={{ width: size, height: size, borderRadius: radius, margin: 5 }} source={source} />
    );
};

export default RoundedPic;