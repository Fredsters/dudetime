import React from 'react';
import {Animated, PanResponder, Platform, Slider, StyleSheet, Text, View, Dimensions} from 'react-native';
import {LinearGradient} from 'expo';
import {Ionicons} from '@expo/vector-icons';

function linearTransform(fValue, fInputMin, fInputMax, fOutputMin, fOutputMax) {
    var fDiff, fSign, fOutputDiff;

    fDiff = fInputMax - fInputMin;
    if (fDiff === 0.0) {
        jQuery.sap.log.error("Cannot determine linear transformation when max == min");
        return null;
    }

    fSign = fDiff < 0 ? -1.0 : 1.0;
    fOutputDiff = fOutputMax - fOutputMin;
    return fSign * fValue < fSign * fInputMin ? fOutputMin
        : fSign * fValue > fSign * fInputMax ? fOutputMax
            : (fValue - fInputMin) * fOutputDiff / fDiff + fOutputMin;
}

class AcceptSlider extends React.Component {

    _handlePanResponderMove = (event, gestureState) => {
        this._dragThumbStyles.style.left = this._previousLeft + gestureState.dx;
        this._updateNativeStyles();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        this._previousLeft += gestureState.dx;
        this._updateNativeStyles();
        let width = Dimensions.get('window').width;
        this.moveAnimation.setValue({x: this._dragThumbStyles.style.left, y: 20});
        if((width - 80) > this._dragThumbStyles.style.left) {
            this._dragThumbToStart();
        } else {
            this._dragThumbToAccept();
        }

    };

    _updateNativeStyles() {
        this.dragThumb && this.dragThumb.setNativeProps(this._dragThumbStyles);
    }

    _updateAfterAnimation() {
        this._grant = true;
        this._updateNativeStyles();
    }

    _previousLeft = 20;
    _grant = true;
    _dragThumbStyles = {
        style: {
            left: this._previousLeft,
        }
    };

    _dragThumbToStart = () => {
        this._grant = false;
        this._dragThumbStyles.style.left = 20;
        this._previousLeft = 20;
        Animated.spring(this.moveAnimation, {
            toValue: {x: 20, y: 20},
        }).start(this._updateAfterAnimation.bind(this));
    };

    _dragThumbToAccept = () => {
        let x = Dimensions.get('window').width - 60;
        this._grant = false;
        this._dragThumbStyles.style.left =x;
        this._previousLeft = x;
        Animated.spring(this.moveAnimation, {
            toValue: {x: x, y: 20},
        }).start(this._updateAfterAnimation.bind(this));
    };

    constructor(props) {
        super(props);

        this.moveAnimation = new Animated.ValueXY({x: 20, y: 20});

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => this._grant,
            onMoveShouldSetPanResponder: () => this._grant,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this.state = {
            startSlider: [0, 0.3],
            endSlider: [1, 0.3],
            locations: [0, 0],
            colors: ['#1db954', 'transparent']
        };
    }

    render() {
        return (
            <LinearGradient
                colors={this.state.colors}
                start={this.state.startSlider}
                end={this.state.endSlider}
                locations={this.state.locations}

            >

                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    maximumTrackTintColor={"transparent"}
                    minimumTrackTintColor={"transparent"}
                    thumbImage={require("../assets/images/arrow_right_2.png")}
                    thumbStyle={styles.thumb}
                    onValueChange={(a) => {
                        this.setState({locations: [Math.pow(a, 3), a]});
                    }}
                >
                </Slider>


                <View style={styles.pan}>
                    <Animated.View ref={dragThumb => {
                        this.dragThumb = dragThumb;
                    }}
                                   style={[styles.dragThumb, this.moveAnimation.getLayout()]} {...this._panResponder.panHandlers}></Animated.View>
                </View>

            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    slider: {
        height: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    thumb: {
        paddingBottom: 2
    },
    pan: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "cyan",
        justifyContent: "space-between"
    },
    dragThumb: {
        height: 40,
        width: 40,
        backgroundColor: 'yellow',
        position: 'absolute',
    },
    target: {
        height: 40,
        width: 40,
        backgroundColor: 'blue'
    }
});

export default AcceptSlider;
