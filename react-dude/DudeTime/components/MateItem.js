import React from 'react';
import {Image, Slider, StyleSheet, Text, View} from 'react-native';
import PicList from './PicList';
import TagList from './TagList';
import DudePic from "./DudePic";
import {getDummyImage} from "../util/Util";
import style from '../Style';
import Moment from 'moment';
import AcceptSlider from './AcceptSlider';

const source = getDummyImage();

class MateItem extends React.Component {

    render() {
        let mate = this.props.item;
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
                <AcceptSlider/>
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
    }
});

export default MateItem;
