import React from 'react';
import {Image, Text, View} from 'react-native';

export default class MateItem extends React.Component {
    render({mate}) {
        console.log(this.props);
        console.log(this.props.mates);
        console.log(mate);
        return (
            <View>
                <View>
                    <Image/>
                    <Text>{this.props} </Text>
                </View>
                <View>
                    <Text/>
                    <Text/>
                </View>
            </View>
        );
    }
}
