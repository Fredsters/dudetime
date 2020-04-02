import React from 'react';
import { Image, Slider, StyleSheet, Text, View } from 'react-native';
import PicList from './PicList';
import TagList from './TagList';
import DudePic from "./DudePic";
import { getDummyImage } from "../util/Util";
import { globalStyleSheet, styleConstants } from '../Style';
import Moment from 'moment';
//import AcceptSlider from './AcceptSlider';
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { acceptMate } from '../redux/MateActions';

const source = getDummyImage();

class MateItem extends React.Component {

    render() {
        let mate = this.props.item;

        return (
            <View style={styles.mateItem}>
                <View style={styles.header}>
                    {mate.owner ? (
                        <View>
                            <DudePic size={70}
                                source={{ uri: mate.owner.picturePath }}
                            /> 
                            <Text style={styles.title}>{mate.owner.userName}</Text>
                        </View>)
                        : (<View />)
                    }    
                </View>
 
                <Text style={styles.title}>Grillen und Chillen bis die Wecker klingeln</Text>
                <TagList tags={mate.tags} />
                <PicList dudes={mate.participants} />

                <View style={[styles.figures, globalStyleSheet.row]}>
                    <View><Text style={styles.figureText}>{mate.location}</Text><Text
                        style={styles.figureText}>{mate.subLocation}</Text></View>
                    <View><Text style={styles.figureText}>{Moment(mate.time).format('ddd, L')}</Text><Text
                        style={styles.figureText}>{Moment(mate.time).format(Moment.HTML5_FMT.TIME)}</Text></View>
                </View>
              
            </View>
        );
    }

 // <AcceptSlider myFunc={this.handleMyFunc.bind(this)} />
    handleMyFunc = (mateStatus) => {
        this.props.acceptMate(this.props.item._id);
        // acceptMate(this.props.item._id);
    };
}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    title: {
        color: Colors.white,
        fontSize: styleConstants.fontLarge,
        flex: 1,
        flexWrap: 'wrap'
    },
    mateItem: {
        backgroundColor: Colors.black,
        marginBottom: 20,
        padding: 10,
        flex: 1
    },
    figures: {
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
