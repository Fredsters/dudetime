import React from 'react';
import { Image, Text, View } from 'react-native';
import DudePic from './DudePic';

const DudeListItem = ({ source, name, selected }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            < DudePic
                size={70}
                source={source}
            />
            <Text>
                Peter Man
            </Text>

            {/* selected Icon */}
            <Image></Image>

        </View>
    );
};

export default DudeListItem;
