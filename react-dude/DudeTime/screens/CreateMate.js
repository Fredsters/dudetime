import React from 'react';
import { Button, Text, StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { connect } from "react-redux";
import { createMate } from "../redux/MateActions";
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';
import { styleConstants } from '../Style';
import Colors from '../constants/Colors.js';
import moment from 'moment';
import 'moment/min/locales.min';
import TagList from '../components/TagList';
import { Ionicons, Entypo, Feather } from '@expo/vector-icons'

//var RCTNetworking = require("RCTNetworking");

const minDate = new Date();
minDate.setHours(0,0,0,0);
class CreateMate extends React.Component {
    constructor(props) {
        super(props);
        this.tagInput = React.createRef();
        this.scrollView = React.createRef();
        this.state = {
            title: "",
            tagText: "",
            mode: null,
            date: new Date(),
            modalVisible: false,
            showDate: false,
            showTime: false,
            tags: [],
            location: ""
        }
    }

    componentDidMount() {
        //todo get user's language from phone
        this.props.navigation.setParams({ saveMate: this.onSaveMate });
       moment.updateLocale('de');

    }

    onSaveMate = async () => {
        if(!this.state.title) {
            alert("Fuck yo, your mate needs a title");
            return;
        }
        if(!this.state.date) {
            alert("Fuck yo, your mate needs a date and time");
            return;
        }
        this.props.createMate({
            title: this.state.title,
            time: this.state.date,
            tags: this.state.tags,
            location: this.state.location
        });
        this.props.navigation.goBack();
    }

    setDate (event, date) {
        if(date > minDate) {
            this.setState({date});   
        }
    };

    onTagKeyPress(event, isDone) {
        if(this.state.tagText !== "" && (event.nativeEvent.key === " " || isDone)) {
            const tags = this.state.tags;
            tags.push("#"+this.state.tagText);
            this.tagInput.current.clear();
            this.setState({tags: tags, tagText: ""});
        }
    }

    setTagText(tagText) {
        if(!tagText.endsWith(" ")) {
            this.setState({tagText});
        }
    }

    scrollToView() {
        this.scrollView.current.scrollToEnd();
    }

    static navigationOptions = ({navigation}) => {
        return {
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
                onPress={navigation.getParam('saveMate')}
                title="Go for it!!!"
                color={Colors.green}
                />
            )
          }
        };


    render() {

        return (
                <KeyboardAvoidingView style={{ ...styles.container}} behavior="padding" enabled keyboardVerticalOffset={80}>
                <ScrollView ref={this.scrollView} style={styles.form} showsVerticalScrollIndicator={false}>
                    <View>            
                        <Text style={[styles.text, styles.label]}>Title:</Text>
                        <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text]} autoCompleteType="off" 
                            placeholderTextColor={Colors.lightGrey}
                            autoCorrect={false}
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
                    <View>         
                        <Text style={[styles.text, styles.label]}>Town:</Text>
                        <View>
                            <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text]}
                                placeholderTextColor={Colors.lightGrey}
                                autoCorrect={false}
                                placeholder="Select a Location"
                                defaultValue={this.state.location}
                                returnKeyType='done'
                                onChangeText={(location)=>this.setState({location})}
                            />
                            <Ionicons style={[styles.iconStyle, {top: 19}]} name="ios-pin" size={30} color={Colors.green} />
                        </View>
                    </View>
                    <View style={{marginBottom: 300}}>         
                        <Text style={[styles.text, styles.label, {marginBottom: 10}]}>Tags:</Text>
                        <View>
                            <TagList tags={this.state.tags} />
                            <View>
                                <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text, {paddingRight: 50}]} autoCompleteType="off"
                                    ref={this.tagInput}
                                    autoCorrect={false}
                                    placeholderTextColor={Colors.lightGrey}
                                    placeholder="Add tags (Press space for new tag)"
                                    returnKeyType='done'
                                    value={this.state.tagText}
                                    onFocus={()=>this.scrollToView()}
                                    onKeyPress={(event)=>this.onTagKeyPress(event)}
                                    onChangeText={(tagText)=>this.setTagText(tagText)}
                                    onSubmitEditing={(event)=>this.onTagKeyPress(event, true)}
                                />
                                <Feather style={[styles.iconStyle, {top: 19}]} name="hash" size={30} color={Colors.green} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Modal       
                    animationType="slide"
                    visible={this.state.modalVisible}
                    style={styles.modal}
                    onBackdropPress={() => this.setState({modalVisible: false})}
                    >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtons}>
                            <Button color={Colors.green} onPress={() => this.setState({modalVisible: false})} title="Cancel"/>
                            {this.state.mode === 'date' ?
                            <Button color={Colors.green} onPress={() => this.setState({showDate: true, modalVisible: false})} title="Take this date!"/>
                            : <Button color={Colors.green} onPress={() => this.setState({showTime: true, modalVisible: false})} title="Take this Time!"/>
                            }                           
                        </View>
                        <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            minuteInterval={15}
                            display="spinner"
                            minimumDate={minDate}
                            onChange={this.setDate.bind(this)}
                        />
                    </View>
                </Modal>
                </KeyboardAvoidingView>
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
        ...bindActionCreators({createMate }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMate);
