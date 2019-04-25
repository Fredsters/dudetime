import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import style from '../Style';
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    tag: {
        marginLeft: 5,
        marginRight: 5,
        color: Colors.white,
        fontSize: 16
    }
});

const TagList = ({tags}) => {
    if (tags) {
        return (
            <View style={style.row}>
                {tags.map((item, key) => {
                        return (
                            <Text style={styles.tag} key={key}>{item}</Text>
                        )
                    }
                )}
            </View>
        );
    } else {
        return (
            <View style={style.row}>
            </View>
        );
    }
};
export default TagList;
