import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import PicList from './PicList';
import TagList from './TagList';
import DudePic from "./DudePic";
import { getDummyImage } from "../util/Util";
import { globalStyleSheet, styleConstants } from '../Style';
import { Ionicons, Entypo } from '@expo/vector-icons'
import moment from 'moment';
import 'moment/min/locales.min';
import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { acceptMate } from '../redux/MateActions';
import AcceptArea from "../components/AcceptArea";
import {MateStatus} from "../constants/Enum";

const source = getDummyImage();

class MateItem extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //todo get user's language from phone
       moment.updateLocale('de');

    }

    handleConfirmed(confirmation) {
        console.log("handleConfirmed");
        console.log(confirmation)
        this.setState({status: confirmation});
        this.props.acceptMate({
            status: confirmation,
            id: this.props.item.id
        });
    }

    render() {
        const mate = this.props.item;
        //todo use actual data
        return (
            <View style={styles.mateItem}>
                <View style={[styles.mateItemContent]}>
                   
                        {mate.owner ? (
                            <View style={[styles.header]}>
                                <DudePic size={70}
                                    source={source}
                                /> 
                                <Text style={[styles.nameText, {marginLeft: 15} ]}>{mate.owner.userName}</Text>
                            </View>)
                            : (<View />)
                        }    
                  
    
                    <Text style={[styles.title, {marginTop: 5}]}>{mate.title}</Text>
                    <TagList tags={mate.tags} style={[{marginBottom: 5}]} />

                    <View style={[globalStyleSheet.row, styles.container, {marginBottom: 5}]}>                
                        <Ionicons name="md-time" size={30} color={Colors.green} style={{marginRight: 10, marginLeft: 2}}/>
                        <Text style={styles.figureText}>{moment(mate.time).format('llll')}</Text>
                    </View>
                    {!!mate.location && <View style={[globalStyleSheet.row, styles.container, {marginBottom: 5}]}>
                        <Ionicons name="ios-pin" size={30} width={30} color={Colors.green} style={{marginRight: 13, marginLeft: 5}}/>
                        <Text style={[styles.figureText, styles.marginRight]}>{mate.location}</Text>
                        <Text style={styles.figureText}> {mate.subLocation}</Text>
                    </View>}

                    {mate.accpetedBy && mate.accpetedBy.length > 0 && <View style={[globalStyleSheet.row, styles.container]}>                
                        <Entypo name="check" size={30} width={30} color={Colors.green} style={{marginRight: 5}}/>  
                        <PicList dudes={mate.accpetedBy}/> 
                    </View> }
                    
                </View>
                <AcceptArea status={mate.status} onStatusChangedHandler={this.handleConfirmed.bind(this)}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: Colors.white,
        fontSize: styleConstants.fontLarge,
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: "bold",
        fontFamily: "beachday",
        marginBottom: 5
    },
    nameText: {
        color: Colors.white,
        fontSize: styleConstants.fontMedium,
        fontFamily: "beachday",
    },
    mateItemContent: {
        padding: 10,
        flex: 1
    },
    mateItem : {
        backgroundColor: Colors.lightBlack,
        overflow: "hidden",
        marginBottom: 10
    },
    figures: {
        justifyContent: 'space-between'
    },
    figureText: {
        color: Colors.white,
        fontSize: styleConstants.fontMedium
    },
    container: {
        alignItems: "center",
        flex: 1
    },
    marginRight: {
        marginRight: 8
    },
    buttonContainer: {
        marginTop: 20
    },
    button: {
        flex: 1,
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        borderColor: Colors.lightGrey
    },
    abc: {
        borderRadius: 50,
        width: 0,
        height: 0,
        backgroundColor: Colors.green
    }
});

const mapStateToProps = null;

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        acceptMate,
    }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(MateItem);
