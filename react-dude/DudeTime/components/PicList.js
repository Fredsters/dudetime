import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import DudePic from "./DudePic";
import {globalStyleSheet} from '../Style';
import {getDummyImage} from '../util/Util.js';

const picList = ({dudes}) => {
    if (dudes) {
        return (
            <View style={globalStyleSheet.row}>
                {dudes.map((item, key) => {
                        let source = getDummyImage();
                        return (
                            <DudePic key={key}
                                     size={40}
                                     source={source}
                            />)
                    }
                )}
            </View>
        )
    } else {
        return (
            <View style={globalStyleSheet.row}/>
        )
    }
};

export default picList;
