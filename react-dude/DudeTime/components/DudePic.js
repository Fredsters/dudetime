import React from 'react';
import { Image, Text, View } from 'react-native';

const DudePic = ({ source, size, name }) => {
    let radius = size / 2;
    return (
        <View style={{ width: size, alignItems: "center"}}>
            <Image style={{ width: size, height: size, borderRadius: radius, margin: 5 }} source={source} />
            {name ?
                (<Text>{name}</Text>) : null
            }
        </View>
    );
};

export default DudePic;
