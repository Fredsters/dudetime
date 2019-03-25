import React from 'react';
import {Image, Text, View} from 'react-native';
import PicList from './PicList';
import TagList from './TagList';

//todo this might better be a stateless component

class MateItem extends React.Component {


    render() {
        console.log(this.props.title);
        let mate = this.props.item;
        return (
            <View>
                <View>
                    <Image/>
                    <Text> </Text>
                </View>

                <TagList tags={mate.tags}/>
                <PicList dudes={mate.participants}/>

                <View>

                </View>
            </View>
        );
    }

}

export default MateItem;
