import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import DudePic from "./DudePic";
import style from '../Style';
import {getDummyImage} from '../util/Util.js';

const picList = ({dudes}) =>
    (
        <View style={style.row}>
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
    );

export default picList;
