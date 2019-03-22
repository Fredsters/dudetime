import React from 'react';
import {Image, Text, View} from 'react-native';

//todo this might better be a stateless component

class MateItem extends React.Component {

    render() {
        console.log(this.props.title);
        return (
            <View>
                <View>
                    <Image/>
                    <Text>"adsad" </Text>
                </View>
                <View>
                    <Text/>
                    <Text/>
                </View>
            </View>
        );
    }

}

export default MateItem;
