import React from 'react';
import { Button, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { connect } from "react-redux";
import colors from "../constants/Colors.js"
import { bindActionCreators } from 'redux';
import { newUser, updateUser, updateProfilePicture } from "../redux/AuthAction";
import { Contacts, Google, ImagePicker, Permissions } from 'expo';
import { clientId } from "../constants/network";
import myFirebase from "../network/firebase";
import * as firebase from 'firebase';

import phone from "../network/phone";


var RCTNetworking = require("RCTNetworking");

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.user.userName,
            picturePath: this.props.user.picturePath,
            phoneNumber: this.props.user.phoneNumber
        };
    }

    async componentDidMount() {

        this.retrieveContacts(); //Todo contacts in backend needs to be updated regularly

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.setState({
                    userName: this.props.user.userName || user.displayName,
                    picturePath: this.props.user.picturePath || user.photoURL
                });
            } else {
                await this.login();
            }
        });
    }

    login = async () => {
        try {
            const { type, idToken, accessToken } = await Google.logInAsync({
                clientId: clientId
            });
            if (type === 'success') {
                this.idToken = idToken;//for auth on server
                this.accessToken = accessToken; //for google api

                //ignore RefreshToken and result of firebase auth, because we have accessToken, and idToken already from google login
                myFirebase.login(idToken, accessToken);
            } else {
                alert("You are not authorized dude!");
            }
        } catch (e) {
            console.log("Error authenticating the user", e);
            alert("The authentication failed, dammit!!");
        }
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

    saveUser = () => {
        if (this.props.user && this.props.user.id) {
            this.props.updateUser({
                userName: this.state.userName,
                phoneNumber: this.state.phoneNumber,
                contacts: this.contacts,
                idToken: this.idToken
            });
        } else {
            this.props.newUser({
                userName: this.state.userName,
                picturePath: this.state.picturePath,
                phoneNumber: this.state.phoneNumber,
                contacts: this.contacts,
                idToken: this.idToken
            });
        }
    };

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                mediaTypes: "Images"
            });
            if (!pickerResult.cancelled) {
                this.uploadImage(pickerResult.uri);
            }
        }
    };

    uploadImage = async (localImageUri) => {
        const phoneImage = await phone.retrieveImage(localImageUri);
        const imageUrl = await myFirebase.uploadImage(phoneImage);
        phoneImage.close();
        //todo store image directly in mongodb when user exists
        this.setState({ picture: imageUrl });
        this.setState({ picturePath: imageUrl });

        if (this.props.user && this.props.user.id) {
            this.props.updateProfilePicture({picturePath: imageUrl});
        }
    };

    clearCookies = () => {
        RCTNetworking.clearCookies(() => {
        });
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

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: this.state.picturePath }} />
                        <Button
                            onPress={this._pickImage}
                            title="Add profile pic"
                            color="#841584"
                        />
                    </View>
                    <View>
                        <TextInput style={styles.textInput}
                            onChangeText={(userName) => this.setState({ userName })}
                            value={this.state.userName}
                            placeholder="Your userName" />
                        <Image style={styles.image} source={{
                            uri: this.state.picture
                        }} />
                        <TextInput style={styles.textInput}
                            onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                            value={this.state.phoneNumber}
                            placeholder="Your phone number" />
                        <Button title="save"
                            onPress={this.saveUser}>
                        </Button>

                        <Button title="Authenticate"
                            onPress={this.login}>
                        </Button>

                        <Button title="clear Cookies"
                            onPress={this.clearCookies}>
                        </Button>
                        <Button title="store Image"
                            onPress={this.uploadImage}>
                        </Button>
                        <Button title="logout"
                            onPress={this.logout}>
                        </Button>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        borderRadius: 100,
        width: 200,
        height: 200
    },
    imageContainer: {
        flexDirection: "row"
    },
    textInput: {
        height: 60,
        borderColor: colors.grey,
        borderWidth: 1,
        margin: 20,
    }

});

const mapStateToProps = (state) => {
    const { auth } = state;
    return auth;
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ newUser, updateUser, updateProfilePicture }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
