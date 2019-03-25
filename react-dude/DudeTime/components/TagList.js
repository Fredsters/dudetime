import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import style from '../Style';

const styles = StyleSheet.create({
    tag: {
        marginLeft: 5,
        marginRight: 5,
        color: '#1db954',
        fontSize: 16
    }
});

const TagList = ({tags}) => {
    tags.push("#Hallo", "#Sauufeeen!");
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
};
export default TagList;
