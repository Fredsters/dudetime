import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import DudePic from "./DudePic";
import {images} from "../assets/example_pics";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        flexWrap: "wrap"
    }
});

const CustomRow = ({dudes}) =>
    (
        <View style={styles.container}>
            {dudes.map((item, key) => {
                    var pic = Math.floor(Math.random() * Math.floor(7));
                    let source = null;
                    if (images) {
                        source = images[pic].uri;
                    }
                    return (
                        <DudePic key={key}
                                 size={40}
                                 source={source}
                        />)

                }
            )}
        </View>
    );


export default CustomRow;
