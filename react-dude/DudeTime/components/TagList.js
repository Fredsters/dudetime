import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyleSheet} from '../Style';
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    tag: {
        marginRight: 10,
        color: Colors.white,
        fontSize: 16
    }
});

const TagList = ({tags}) => {
    if (tags) {
        return (
            <View style={globalStyleSheet.row}>
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
            <View style={globalStyleSheet.row}>
            </View>
        );
    }
};
export default TagList;
