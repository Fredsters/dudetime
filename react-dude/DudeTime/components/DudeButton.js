import React, { useState, useRef, useMemo, useEffect } from 'react';
import {Animated, View, StyleSheet, PanResponder } from 'react-native';
import Colors from "../constants/Colors";
import { Entypo } from '@expo/vector-icons'
const DudeButton = (props) => {

    //todo set state back when rerender
    let confirmed = props.set || false;    
    let [circleSacle, setCircleScale] = useState(new Animated.Value(0));
    if(!confirmed) {
        useEffect(() => {
            // Every time the component has been re-rendered,
            // the counter is incremented
            setCircleScale(new Animated.Value(0));
            console.log(circleSacle);
          }); 
    }
    const textScale = useRef(new Animated.Value(1)).current;
    const textTranslateX = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(0)).current;
    const [scaleColor, setScaleColor] = useState('transparent');
    const [textOpacity, setTextOpacity] = useState(0);
    const [color, setColor] = useState(props.color);
    let startTimeStamp;
    let endTimeStamp;
    

    const onConfirmed = (event) => {
        props.onConfirmed(props.type);
    }

    const unSet = () => {
        setColor(props.color);
    }

    const done = () => {
        confirmed = true;
        setColor(Colors.white);
        onConfirmed();
    }

    const releaseAnimation = (isRelease) => {
        setTextOpacity(0);
        if(isRelease && (endTimeStamp - startTimeStamp > 800)) {
            Animated.sequence([
                Animated.parallel([
                    Animated.spring(circleSacle, {
                        toValue: 0,
                        overshootClamping: true
                    }),
                    Animated.spring(textScale, {
                        toValue: 16,
                        overshootClamping: true
                    }),
                    Animated.spring(textTranslateX, {
                        toValue: 0,
                        overshootClamping: true
                    }),
                    Animated.spring(textTranslateY, {
                        toValue: 0,
                        overshootClamping: true
                    })
                ]),
                Animated.spring(circleSacle, {
                    toValue: 1.2,
                    overshootClamping: true
                }),
            ]).start(done);

        } else {
            Animated.parallel([
                Animated.spring(circleSacle, {
                    toValue: 0,
                    overshootClamping: false
                }),
                Animated.spring(textScale, {
                    toValue: 16,
                    overshootClamping: false
                }),
                Animated.spring(textTranslateX, {
                    toValue: 0,
                    overshootClamping: false
                }),
                Animated.spring(textTranslateY, {
                    toValue: 0,
                    overshootClamping: false
                })
            ]).start();
        }


    }

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => {
            return !confirmed;
        },
        onPanResponderGrant: (evt, gestureState) => {
            startTimeStamp = evt.timeStamp;
            setTextOpacity(1);
            setScaleColor(props.color);
            Animated.parallel([
                Animated.spring(circleSacle, {
                    toValue: 10
                }),
                Animated.spring(textScale, {
                    toValue: 50,
                    overshootClamping: true
                }),
                Animated.spring(textTranslateX, {
                    toValue: props.translateX,
                    overshootClamping: true
                }),
                Animated.spring(textTranslateY, {
                    toValue: -100,
                    overshootClamping: true
                })
            ]).start();
        },

        onPanResponderRelease: (evt, gesture) => {
            console.log("release");
            endTimeStamp = evt.timeStamp;
            releaseAnimation(true);
        },
        onPanResponderTerminate: (evt, gesture) => {
            console.log("terminate");
            releaseAnimation(false);
          }
    }), []);  

  return (
    <View // Special animatable View
        {...panResponder.panHandlers}
        style={{
            ...props.style
        }}>
      <Animated.View style={{
                        position: 'absolute',
                        bottom: 2,
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        transform: [{ scale: circleSacle }],
                        backgroundColor: scaleColor
                    }}>
      </Animated.View>
      <Animated.Text style={[styles.text, {opacity: textOpacity, fontSize: textScale, transform: [{translateX: textTranslateX}, {translateY: textTranslateY}]}]}>{props.text}</Animated.Text>
      <Entypo name={props.icon} size={36} color={color} />
    </View>
  );

};

const styles = StyleSheet.create({
    text : {
        color: Colors.white,
        fontWeight: "bold",
        fontFamily: "beachday",
        position: 'absolute'
    }
});

export default DudeButton;

