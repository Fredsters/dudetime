import React from 'react';
import { FlatList } from 'react-native';
import MateItem from './MateItem';


const MateList = (props) => {

    let offset = 0;
    let isUpwards = false;

    const onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        var diff = currentOffset - offset;
        offset = currentOffset;
        if(Math.abs(diff) > 30) {
            if(diff > 0 && offset > 0 && isUpwards) {
                isUpwards = false;
                props.onScrollDirectionChange(isUpwards);
            } else if((diff < 0 || offset < 0) && !isUpwards) {
                isUpwards = true;
                props.onScrollDirectionChange(isUpwards);
            } 
            
        }
    }

    const renderMateItem = ({ item }) => (<MateItem
        item={item}
    />);

    return (
        <FlatList
                data={props.mates}
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                keyExtractor={(item) => item._id}
                initialNumToRender={8} 
                renderItem={renderMateItem}
            />
    )
} 

export default MateList;
