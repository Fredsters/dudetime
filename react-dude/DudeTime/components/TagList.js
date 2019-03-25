import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        flexWrap: "wrap"
    },
    tag: {
        marginLeft: 5,
        marginRight: 5,
    }
});

const TagList = ({tags}) => {
    console.log("tags");
    tags.push("#Hallo", "#Sauufeeen!");
    return (
        <View style={styles.container}>
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
