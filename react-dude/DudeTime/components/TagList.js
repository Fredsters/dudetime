import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyleSheet, styleConstants} from '../Style';
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
    tag: {
        marginRight: 10,
        color: Colors.white,
        fontSize: styleConstants.fontMedium
    },
    container: {
        marginBottom: 15
    }
});

const TagList = ({tags}) => {
    if (tags) {
        return (
            <View style={[styles.container, globalStyleSheet.row]}>
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
