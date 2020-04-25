import React from 'react';
import { Input, Text, View } from 'react-native';

const DudeInput = ({ label, type, autoFocus, dataDetectorType }) => {
    return (
        <View>
            <Text>{label}</Text>
            <Input autoCompleteType="off" autoCorrect={false} autoFocus={autoFocus} dataDetectorTypes={dataDetectorTypes} ></Input>
        </View>
    );
};

export default DudeInput;