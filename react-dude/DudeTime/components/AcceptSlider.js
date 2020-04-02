import React from 'react';
import {Animated, Dimensions, PanResponder, StyleSheet, Text, UIManager, View} from 'react-native';
import {LinearGradient} from 'expo';
import {AntDesign} from '@expo/vector-icons';
import Colors from "../constants/Colors";

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const deviceWidth = Dimensions.get('window').width;
const thumbStart = 20;
const thumbEnd = deviceWidth - 60;
const thumbDropArea = deviceWidth / 2;
const thumbTopOffset = 0;

class AcceptSlider extends React.Component {

    componentWillMount = () => {

        this._animatedValueX = thumbStart;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this._animatedValueX, y: thumbTopOffset});
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: thumbTopOffset},
            ]),
            onPanResponderRelease: (e, gestureState) => {
                this.state.pan.flattenOffset();
                thumbDropArea > gestureState.moveX ? this._bounceToTarget(thumbStart) : this._bounceToTarget(thumbEnd);
            }
        });
    };

    componentWillUnmount = () => {
        this.state.pan.x.removeAllListeners();
    };

    getStyle = () => {
        return [
            styles.dragThumb, {
                transform: [{
                    translateX: this.state.pan.x
                }, {
                    rotate: this.state.pan.x.interpolate({
                        inputRange: [thumbStart, (thumbStart + thumbEnd) / 2, thumbEnd],
                        outputRange: ["0deg", "180deg", "360deg"]
                    })
                }]
            }
        ];
    };

    getInnerStyle = () => {
        return [
            styles.innerThumb, {
                shadowOpacity: this.state.pan.x.interpolate({
                    inputRange: [thumbStart, thumbEnd],
                    outputRange: [0, 0.8]
                })
            }, {
                transform: [{
                    scale: this.scaleValue
                }]
            }
        ];
    };

    _bounceToTarget = (thumbTarget) => {
        Animated.spring(this.state.pan, {
            toValue: {x: thumbTarget, y: thumbTopOffset},
            useNativeDriver: true
        }).start();
        if (thumbTarget === thumbEnd) {
            Animated.sequence([
                Animated.timing(this.scaleValue, {
                    toValue: 2,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.spring(this.scaleValue, {
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]).start();

            if (!this.state.accepted) {
                this.setState({
                    iconName: "checkcircleo",
                    gradientColors: [Colors.cyan, Colors.green],
                    text: "Hell Yeah!!!",
                    accepted: true
                });
                this.props.myFunc(true);
            }
        } else {
            if (this.state.accepted) {
                this.setState({
                    iconName: "rightcircleo",
                    gradientColors: [Colors.grey, Colors.green],
                    text: "Sorry Dude!",
                    accepted: false
                });
                this.props.myFunc(false);
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({x: thumbStart, y: thumbTopOffset}),
            iconName: "rightcircleo",
            gradientColors: [Colors.grey, Colors.green],
            text: "Sorry Dude!",
            accepted: false
        };
        this.scaleValue = new Animated.Value(1);
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    style={[styles.gradient]}
                    colors={this.state.gradientColors}
                    start={[0, 0.3]}
                    end={[1, 0.3]}
                >
                    <Text style={styles.text}>{this.state.text}</Text>
                </LinearGradient>
                <Animated.View style={this.getStyle()} {...this._panResponder.panHandlers}>
                    <Animated.View style={this.getInnerStyle()}>
                        <LinearGradient
                            style={[styles.innerGradient]}
                            colors={this.state.gradientColors}
                            start={[0, 0]}
                            end={[1, 1]}
                        >
                            <AntDesign
                                name={this.state.iconName}
                                size={40}
                                color={Colors.white}
                            />
                        </LinearGradient>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        height: 60,
        position: 'relative'
    },
    dragThumb: {
        height: 60,
        width: 40,
        position: 'absolute',
        paddingTop: 10,
        paddingBottom: 10,
    },
    innerThumb: {
        borderRadius: 40,
        shadowColor: Colors.black,
        backgroundColor: "red",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 14,
    },
    innerGradient: {
        borderRadius: 40,
    },
    text: {
        color: Colors.white,
        opacity: 0.7,
        fontSize: 20
    }
});

export default AcceptSlider;
