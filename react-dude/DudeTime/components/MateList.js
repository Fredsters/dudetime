import React from 'react';
import { FlatList } from 'react-native';
import MateItem from './MateItem';


const MateList = ({mates}) => {
    return (
        <FlatList
                data={mates}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) =>
                    <MateItem
                        item={item}
                    />
                }
            />
    )
} 

export default MateList;
