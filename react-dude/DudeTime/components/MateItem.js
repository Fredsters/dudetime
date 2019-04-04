import React from 'react';
import {Image, Slider, StyleSheet, Text, View} from 'react-native';
import PicList from './PicList';
import TagList from './TagList';
import DudePic from "./DudePic";
import {getDummyImage} from "../util/Util";
import style from '../Style';
import Moment from 'moment';
import AcceptSlider from './AcceptSlider';
import Colors from "../constants/Colors";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {acceptMate} from '../redux/MateActions';

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
                <AcceptSlider myFunc={this.handleMyFunc.bind(this)}/>
            </View>
        );
    }


    handleMyFunc = (mateStatus) => {
        console.log("DO ITTTTT MANAAA");
        console.log(mateStatus);
        console.log("current id: " + this.props.item._id);
        this.props.acceptMate(this.props.item._id);
        // acceptMate(this.props.item._id);
    };
}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: Colors.lightBlack,
        height: 90,
        alignItems: 'center'
    },
    title: {
        color: Colors.green,
        fontSize: 20,
        marginLeft: 20,
        flex: 1,
        flexWrap: 'wrap'
    },
    mateItem: {
        backgroundColor: Colors.grey,
        marginBottom: 20
    },
    figures: {
        backgroundColor: Colors.lightBlack,
        justifyContent: 'space-between'
    },
    figureText: {
        color: Colors.green,
    }
});

const mapStateToProps = null;

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        acceptMate,
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(MateItem);
