import React from 'react';
import {Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { globalStyleSheet, styleConstants } from '../Style';
import Colors from "../constants/Colors";
import {MateStatus} from "../constants/Enum";
import { Entypo } from '@expo/vector-icons'
const AnimatedEntypo = Animated.createAnimatedComponent(Entypo);
const AcceptArea = (props) => {

const [status, setStatus] = React.useState(props.status);
let crossSizeInitValue;
let checkSizeInitValue;
if(props.status === MateStatus.Accepted) {
    crossSizeInitValue = new Animated.Value(18);
    checkSizeInitValue = new Animated.Value(56);
} else if(props.status === MateStatus.Rejected) {
    crossSizeInitValue = new Animated.Value(56);
    checkSizeInitValue = new Animated.Value(18);
} else {
    crossSizeInitValue = new Animated.Value(36);
    checkSizeInitValue = new Animated.Value(36);
}
const crossSize = React.useRef(crossSizeInitValue).current;
const checkSize = React.useRef(checkSizeInitValue).current;

const onStatusChanged = (newStatus) => {
    if(newStatus === MateStatus.Accepted) {
        Animated.parallel([
            Animated.spring(checkSize, {
                toValue: 56,
                useNativeDriver: false
            }),
            Animated.spring(crossSize, {
                toValue: 18,
                useNativeDriver: false
            })
        ]).start();
    } else if(newStatus === MateStatus.Rejected) {
        Animated.parallel([
            Animated.spring(crossSize, {
                toValue: 56,
                useNativeDriver: false
            }),
            Animated.spring(checkSize, {
                toValue: 18,
                useNativeDriver: false
            })
        ]).start();
    }
    setStatus(newStatus);
    props.onStatusChangedHandler(newStatus);
}

  return (
    <View style={[globalStyleSheet.row, styles.acceptArea, {borderColor: status === MateStatus.Accepted ? Colors.green : status === MateStatus.Rejected ? Colors.red : Colors.lightBlack}]}>
        <TouchableOpacity style={styles.button} onPress={()=>onStatusChanged(MateStatus.Rejected)}>
            <AnimatedEntypo name="cross" size={crossSize} color={Colors.red} style={{fontSize: crossSize, ...styles.icon}} />
        </TouchableOpacity>
        <Text style={styles.acceptText}>{(status === MateStatus.Accepted) ? 'I\'m In!' : status === MateStatus.Rejected ? 'Nope!' : ''}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>onStatusChanged(MateStatus.Accepted)}>
            <AnimatedEntypo name="check" size={checkSize} color={Colors.green} style={{fontSize: checkSize, ...styles.icon}}/>
        </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
    acceptArea: {
        alignItems: "center",
        flex: 1,
        borderBottomWidth: 5,
        zIndex: -1
    },
    button: {
        flex: 1,
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    icon: {
        position: 'absolute'
    },
    acceptText: {
        color: Colors.white,
        fontWeight: "bold",
        fontFamily: "beachday",
        fontSize: styleConstants.fontXLarge,
        width: 76
    }
});

export default AcceptArea;

