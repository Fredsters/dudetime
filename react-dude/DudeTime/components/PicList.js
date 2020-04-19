import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import DudePic from "./DudePic";
import {globalStyleSheet} from '../Style';
import {getDummyImage} from '../util/Util.js';

const picList = ({dudes}) => {
    if (dudes) {
        let textTranslateX = -25;
        return (
            <View style={[globalStyleSheet.row, {height: 50}]}>
                {dudes.map((item, key) => {
                        textTranslateX = textTranslateX + 25;
                        let source = getDummyImage();
                        return (
                            <DudePic key={key}
                                     size={50}
                                     source={source}
                                     style={{transform: [{translateX: textTranslateX}], position: "absolute"}}
                                     active={true}
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
