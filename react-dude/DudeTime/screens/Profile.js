import React from 'react';
import { Button, Text, StyleSheet, TextInput, View } from 'react-native';
import { connect } from "react-redux";
import colors from "../constants/Colors.js"
import { bindActionCreators } from 'redux';
import { newUser, storeAuthInfo, updateProfilePicture, updateUser, clearUser, updateUserContacts } from "../redux/AuthActions";
import { globalStyleSheet, styleConstants } from '../Style';
import { Google } from "expo-google-app-auth";
import * as Contacts from 'expo-contacts';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

import { clientId } from "../constants/network";
import myFirebase from "../network/firebase";
import * as firebase from 'firebase';

import phone from "../network/phone";
import RoundedPic from '../components/RoundedPic.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors.js';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

//var RCTNetworking = require("RCTNetworking");

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.persistor = this.props.screenProps.persistor;
        this.state = {
            userName: this.props.user.userName,
            picturePath: this.props.user.picturePath,
            phoneNumber: this.props.user.phoneNumber
        };
        this.contacts = [];
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: Colors.grey,
                shadowColor: 'transparent'
            },
            title: "Profile",
            headerTintColor: Colors.green,
            headerBackTitle: "Cancel",
            headerTitleStyle: {
                color: Colors.white,
                fontWeight: 'bold',
                fontSize: styleConstants.fontMedium
            },
            headerRight: () => (
                <Button
                onPress={navigation.getParam('saveUser')}
                title="Save"
                color={Colors.green}
                />
            )
        }
    };

    componentDidMount () {
        this.props.navigation.setParams({ saveUser: this.onSaveUser });
        this.registerForPushNotificationsAsync();
        this.retrieveContacts();
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          this.expoPushToken = token;
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }
      };

    onSaveUser = async () => {
        if(this.state.userName === "") {
            alert("Fuck yo, I need your name");
            return;
        }
        if(this.state.phoneNumber === "") {
            alert("Fuck yo, I need your number");
            return;
        }
        if(this.contacts.length === 0 ) {
            //do something
        } 
        this.props.newUser({
            userName: this.state.userName,
            picturePath: this.state.picturePath,
            phoneNumber: this.state.phoneNumber,
            contacts: this.contacts,
            expoPushToken: this.expoPushToken
            // idToken: this.idToken,
            // authId: this.authId
        });
            
    };

    retrieveContacts = async () => {
        const { data } = await Contacts.getContactsAsync();
        const contacts = data.map(contact => {
            return contact.phoneNumbers && contact.phoneNumbers.map(number => {
                return {
                    "countryCode": number.countryCode,
                    "number": number.digits
                }
            }).flat();
        }).flat().filter(number => !!number);
        this.contacts = contacts;
    };

    pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
            });
            if (!pickerResult.cancelled) {
                this.setState({ picturePath: pickerResult.uri });
                //this.uploadImage(pickerResult.uri);
            }
        }
    };

    uploadImage = async (localImageUri) => {
        const phoneImage = await phone.retrieveImage(localImageUri);
        const imageUrl = await myFirebase.uploadImage(phoneImage);
        phoneImage.close();
        //todo store image directly in mongodb when user exists
        this.setState({ picturePath: imageUrl });

        if (this.props.user && this.props.user.id) {
            this.props.updateProfilePicture({ picturePath: imageUrl });
        }
    };

    purgePersistor = async () => {
        await this.persistor.purge();
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.header]}>
                    <View style={styles.pictureContainer}>
                        <RoundedPic style={styles.image} source={{uri: this.state.picturePath}} size={70}></RoundedPic>
                        <TouchableOpacity onPress={this.pickImage}>
                            <Text style={[styles.editButton, {fontSize: styleConstants.fontMedium}]}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.description, styles.text]}>Dude, give me ya name and phone number please!</Text>                    
                    
                    
                </View>
                <View style={styles.form}>
                    <View>            
                        <Text style={[styles.text, styles.label]}>Name:</Text>
                        <TextInput selectionColor={Colors.green} style={[styles.textInput, styles.text]} autoCompleteType="off" 
                            autoCorrect={false} textContentType='givenName' 
                            placeholder="What's your Name?"
                            placeholderTextColor={Colors.lightGrey}
                            defaultValue={this.state.userName}
                            returnKeyType='done'
                            onChangeText={(userName)=>this.setState({userName})}
                            />
                    </View>
                    <View>            
                        <Text style={[styles.text, styles.label]}>My Phone Number:</Text>
                        <TextInput ref={(input) => { this.secondTextInput = input; }} 
                            selectionColor={Colors.green} style={[styles.textInput, styles.text]} 
                            autoCompleteType="off" autoCorrect={false} keyboardType="phone-pad" 
                            returnKeyType='done'
                            placeholder="Can I have your number?"
                            placeholderTextColor={Colors.lightGrey}
                            textContentType='telephoneNumber' defaultValue={this.state.phoneNumber}
                            onChangeText={(phoneNumber)=>this.setState({phoneNumber})}
                            />
                    </View>
                </View>
                <Button onPress={this.purgePersistor} title="purge persistor"></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 15,
        flex: 1,
        alignItems: "stretch",
        backgroundColor: Colors.lightBlack,
    },
    editButton: {
        color: Colors.green,
        marginTop: 5
    },
    header: {
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: "wrap",
        marginBottom: 30
    },
    pictureContainer: {
        alignItems: "center",
    },
    description: {
        flex: 1,
        marginLeft: 15,
        paddingBottom: 25
    },
    form: {
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
        ...bindActionCreators({ newUser, updateUser, updateProfilePicture, storeAuthInfo, clearUser, updateUserContacts }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


/*
async componentDidMount() {    
    // firebase.auth().onAuthStateChanged(async (user) => {
    //     if (user) {
    //         this.setState({
    //             userName: this.props.user.userName || user.displayName,
    //             picturePath: this.props.user.picturePath || user.photoURL
    //         });
    //     } else if (this.props && this.props.user && this.props.user.accessToken && this.props.user.idToken) {
    //         myFirebase.login(this.props.user.idToken, this.props.user.accessToken);
    //     } else {
    //         await this.login();
    //     }
    // }); 
}

login = async () => {
    try {
        const { type, idToken, accessToken, user } = await Google.logInAsync({
            clientId: clientId
        });

        if (type === 'success') {
            this.idToken = idToken;//for auth on server
            this.accessToken = accessToken; //for google api
            this.authId = user.id; //google user id

            //ignore RefreshToken and result of firebase auth, because we have accessToken, and idToken already from google logi

            if (this.props.user.authId !== this.authId) {
                this.props.clearUser();
                this.clearCookies();
            }

            this.props.storeAuthInfo({
                accessToken: accessToken,
                idToken: idToken,
                authId: user.id
            });
            myFirebase.login(idToken, accessToken);
        } else {
            alert("You are not authorized dude!");
        }
    } catch (e) {
        console.log("Error authenticating the user", e);
        alert("The authentication failed, dammit!!");
    }
};

clearCookies = () => {
    // RCTNetworking.clearCookies(() => {
    // });
};

logout = async () => {
    try {
        const accessToken = this.accessToken;
        if (accessToken && clientId) {
            await Google.logOutAsync({ clientId, accessToken });
            this.accessToken = null;
        }
        await firebase.auth().signOut();
    }
    catch (e) {
        alert("Dude whats wrong, singing out failed, dammit!!");
    }
};
*/