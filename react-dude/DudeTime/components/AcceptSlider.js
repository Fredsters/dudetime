import React from 'react';
import {Animated, Dimensions, LayoutAnimation, PanResponder, StyleSheet, UIManager, View} from 'react-native';
import {LinearGradient} from 'expo';
import {AntDesign} from '@expo/vector-icons';


UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const deviceWidth = Dimensions.get('window').width;
const thumbStart = 20;
const thumbEnd = deviceWidth - 60;
const thumbDropArea = deviceWidth - 80;
const thumbTopOffset = 10;

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

    _handlePanResponderGrant = () => {
        this.setState({gradientWidth: deviceWidth});
    };

    _updateBackground = () => {
        //todo use interpolate instead
        var a = linearTransform(this._dragThumbStyles.style.left, thumbStart, thumbEnd, 0, 1);
        // var a = this._dragThumbStyles.style.left.interpolate({
        //     inputRange: [20, this.state.deviceWidth - 60],
        //     outputRange: [0,1]
        // });
        this.setState({gradientLocations: [Math.pow(a, 3), a]});
    };

    _handlePanResponderMove = (event, gestureState) => {
        this._dragThumbStyles.style.left = this._previousLeft + gestureState.dx;
        this._updateBackground();
        this._updateNativeStyles();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        this._previousLeft += gestureState.dx;
        this._updateNativeStyles();
        this.moveAnimation.setValue({x: this._dragThumbStyles.style.left, y: thumbTopOffset});
        if (thumbDropArea > this._dragThumbStyles.style.left) {
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
        this._updateBackground();
    }

    _previousLeft = 10;
    _grant = true;
    _dragThumbStyles = {
        style: {
            left: this._previousLeft,
        }
    };

    _dragThumbToStart = () => {
        this._grant = false;
        this._dragThumbStyles.style.left = thumbStart;
        this._previousLeft = thumbStart;
        LayoutAnimation.spring();
        this.setState({gradientWidth: 1});
        Animated.spring(this.moveAnimation, {
            toValue: {x: thumbStart, y: thumbTopOffset}
        }).start(this._updateAfterAnimation.bind(this));
    };

    _dragThumbToAccept = () => {
        this._grant = false;
        this._dragThumbStyles.style.left = thumbEnd;
        this._previousLeft = thumbEnd;
        this._updateBackground();
        Animated.spring(this.moveAnimation, {
            toValue: {x: thumbEnd, y: thumbTopOffset}
        }).start(this._updateAfterAnimation.bind(this));
    };

    constructor(props) {
        super(props);

        this.moveAnimation = new Animated.ValueXY({x: thumbStart, y: thumbTopOffset});

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => this._grant,
            onMoveShouldSetPanResponder: () => this._grant,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this.state = {
            gradientWidth: Dimensions.get('window').width,
            gradientStart: [0, 0.3],
            gradientEnd: [1, 0.3],
            //todo maybe add some locations and colors
            gradientLocations: [0, 0],
            gradientColors: ['#1db954', 'transparent']
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    style={[styles.gradient, {width: this.state.gradientWidth}]}
                    colors={this.state.gradientColors}
                    start={this.state.gradientStart}
                    end={this.state.gradientEnd}
                    locations={this.state.gradientLocations}
                />
                <Animated.View ref={dragThumb => {
                    this.dragThumb = dragThumb;
                }}
                               style={[styles.dragThumb, this.moveAnimation.getLayout()]} {...this._panResponder.panHandlers}>
                    <AntDesign
                        name="rightcircleo"
                        size={40}
                        color="#ffffff"
                    />
                </Animated.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    gradient: {
        height: 60
    },
    container: {
        flex: 1,
        height: 60,
        position: 'relative'
    },
    dragThumb: {
        height: 40,
        width: 40,
        position: 'absolute'
    }
});

export default AcceptSlider;
