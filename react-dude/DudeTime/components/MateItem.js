import React from 'react';
import {Image, Slider, StyleSheet, Text, View} from 'react-native';
import PicList from './PicList';
import TagList from './TagList';
import DudePic from "./DudePic";
import {getDummyImage} from "../util/Util";
import style from '../Style';
import Moment from 'moment';
import {LinearGradient} from 'expo';

class MateItem extends React.Component {
    render() {
        let mate = this.props.item;
        let source = getDummyImage();

        mate.title = "Saufen gehen. Nächste Woche meldenteresad s sdf sdf  Meldet euchd wad wadwa dwa wad awd awd ss";

        return (
            <View style={styles.mateItem}>
                <View style={styles.header}>
                    <DudePic size={70}
                             source={source}
                    />
                    <Text style={styles.title}>{mate.title}</Text>
                </View>

                <TagList tags={mate.tags}/>
                <PicList dudes={mate.participants}/>

                <View style={[styles.figures, style.row]}>
                    <View><Text style={styles.figureText}>{mate.location}</Text><Text
                        style={styles.figureText}>{mate.subLocation}</Text></View>
                    <View><Text style={styles.figureText}>{Moment(mate.time).format('ddd, L')}</Text><Text
                        style={styles.figureText}>{Moment(mate.time).format(Moment.HTML5_FMT.TIME)}</Text></View>
                </View>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a', 'green']}
                >
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#1db954"
                        maximumTrackTintColor="#000000"
                        onValueChange={(a) => {
                            console.log(`call it ${a}`);
                        }}

                    />
                </LinearGradient>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#282828',
        height: 90,
        alignItems: 'center'
    },
    title: {
        color: '#1db954',
        fontSize: 20,
        marginLeft: 20,
        flex: 1,
        flexWrap: 'wrap'
    },
    mateItem: {
        backgroundColor: '#505050',
        marginBottom: 20
    },
    figures: {
        backgroundColor: '#282828',
        justifyContent: 'space-between'
    },
    figureText: {
        color: '#1db954',
    },
    slider: {
        height: 80,
        marginLeft: 40,
        marginRight: 40,
    }
});

export default MateItem;
