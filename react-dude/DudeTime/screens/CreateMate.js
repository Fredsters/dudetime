import React from 'react';
import { Button, Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';
import { styleConstants, globalStyleSheet } from '../Style';
import Colors from '../constants/Colors.js';
import moment from 'moment';
import 'moment/min/locales.min';
import { Ionicons, Entypo } from '@expo/vector-icons'

//var RCTNetworking = require("RCTNetworking");

class CreateMate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            mode: null,
            date: new Date(),
            modalVisible: false,
            showDate: false,
            showTime: false
        }
    }

    componentDidMount() {
        //todo get user's language from phone
       moment.updateLocale('de');

    }

    setDate (event, date) {
        if(date > new Date()) {
            this.setState({date});   
        }
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.grey,
            shadowColor: 'transparent'
        },
        title: "New Mate",
        headerTintColor: Colors.green,
        headerBackTitle: "Cancel",
        headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: styleConstants.fontMedium
        },
        headerRight: () => (
            <Button
            onPress={() => alert("save")}
            title="Go for it!!!"
            color={Colors.green}
            />
        )
      };

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View>            
                        <Text style={[styles.text, styles.label]}>Title:</Text>
                        <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text]} autoCompleteType="off" 
                            autoCorrect={false}
                            placeholderTextColor={Colors.lightGrey}
                            placeholder="Give your new Mate a nice title"
                            defaultValue={this.state.title}
                            returnKeyType='done'
                            onChangeText={(title)=>this.setState({title})}
                            />
                    </View>
                    <View>         
                        <Text style={[styles.text, styles.label]}>Date:</Text>
                        <TouchableOpacity onPress={()=>this.setState({modalVisible : !this.state.dateVisible, mode: 'date'})}>
                            <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text]}
                                editable={false}
                                pointerEvents="none"
                                placeholderTextColor={Colors.lightGrey}
                                placeholder="Select a Date"
                                value={this.state.showDate ? moment(this.state.date).format('dddd, LL') : ""}
                            />
                            <Entypo style={styles.iconStyle} name="calendar" size={30} color={Colors.green} />
                        </TouchableOpacity>
                    </View>
                    <View>         
                        <Text style={[styles.text, styles.label]}>Time:</Text>
                        <TouchableOpacity onPress={()=>this.setState({modalVisible : !this.state.dateVisible, mode: 'time'})}>
                            <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text]}
                                editable={false}
                                pointerEvents="none"
                                placeholderTextColor={Colors.lightGrey}
                                placeholder="Select a Time"
                                value={this.state.showTime ? moment(this.state.date).format('LT') : ""}
                            />
                            <Ionicons style={[styles.iconStyle, {top: 19}]} name="md-time" size={30} color={Colors.green} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal       
                    animationType="slide"
                    visible={this.state.modalVisible}
                    style={styles.modal}
                    onBackdropPress={() => this.setState({modalVisible: false})}
                    >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtons}>
                            {this.state.mode === 'date' ?
                            <Button color={Colors.green} onPress={() => this.setState({showDate: true, modalVisible: false})} title="Take this date!"/>
                            : <Button color={Colors.green} onPress={() => this.setState({showTime: true, modalVisible: false})} title="Take this Time!"/>
                            }
                            <Button color={Colors.green} onPress={() => this.setState({modalVisible: false})} title="Cancel"/>
                        </View>
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            minuteInterval={15}
                            display="spinner"
                            minimumDate={this.state.mode === 'date' ? new Date() : null}
                            onChange={this.setDate.bind(this)}
                        />
                    </View>
                </Modal>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        position: 'absolute',
        right: 10,
        top: 18
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5
    },  
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    modalView: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: Colors.white,
        paddingTop: 15,
        paddingBottom: 20
    },
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 15,
        flex: 1,
        alignItems: "stretch",
        backgroundColor: Colors.lightBlack,
    },
    form: {
        paddingTop: 20
    },
    textInput: {
        backgroundColor: Colors.grey,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 20,
        marginTop: 10,
    },
    text: {
        color: Colors.white,
        fontSize: styleConstants.fontSmall
    },
    label: {
        fontSize: styleConstants.fontMedium
    }
});

const mapStateToProps = (state) => {
    const { auth } = state;
    return auth;
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMate);
