import React from 'react';
import {Button, Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {connect} from "react-redux";
import colors from "../constants/Colors.js"
import {bindActionCreators} from 'redux';
import {newUser} from "../redux/AuthAction";
import {Contacts, Google, ImagePicker, Permissions} from 'expo';
import {clientId, root} from "../constants/network";
import * as firebase from 'firebase';

var RCTNetworking = require("RCTNetworking");

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        if (!(this.props.auth && this.props.auth.userId)) {
            // this.prepareUserCreation();
        } else {
            this.state = {
                userName: this.props.user.userName,
                picturePath: this.props.user.picturePath
            };
        }

        // const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        // if (permission.status !== 'granted') {
        //     const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        //     if (newPermission.status === 'granted') {
        //         //its granted.
        //     }
        // } else {
        //     //todo handle this stuff
        // }

        firebase.initializeApp(firebaseConfig);
    }

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

            // if (!pickerResult.cancelled) {

            this._handleImagePicked(pickerResult);
            // }
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {
                this.setState({picturePath: pickerResult.uri});
                // uploadResponse = await this.uploadImageAsync(pickerResult.uri);
                // uploadResult = await uploadResponse.json();
                //
                // this.setState({
                //     // picturePath: uploadResult.picturePath,
                //     picture: uploadResult.picturePath
                // });
            }
        } catch (e) {
            console.log({uploadResponse});
            console.log({uploadResult});
            console.log({e});
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };


    uploadImageAsync = async (uri) => {
        //Todo set the url
        // let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

        // Note:
        // Uncomment this if you want to experiment with local server
        //
        // if (Constants.isDevice) {
        //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
        // } else {
        //   apiUrl = `http://localhost:3000/upload`
        // }

        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append('avatar', {
            uri,
            name: `avatar_${this.state.userName}.${fileType}`,
            type: `image/${fileType}`,
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            },
        };

        console.log("Wir fetchen jetzt huer");
        return fetch(`${root}/userImage`, options);
    };

    saveUser = (idToken) => {
        (async () => {
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: {Authorization: `Bearer ${this.state.accessToken}`},
            });

            return await userInfoResponse.json();
            console.log(userInfoResponse);
        })();

        this.props.newUser({
            userName: this.state.userName,
            picture: this.state.picture,
            phoneNumber: this.state.phoneNumber,
            contacts: this.contacts,
            // idToken: idToken
        });
    };

    fetchImage = () => {
        (async () => {
            let userInfoResponse = await fetch(this.state.picture, {
                headers: {Authorization: `Bearer ${this.state.accessToken}`},
            });

            return await userInfoResponse.json();
            console.log(userInfoResponse);
        })();
    };

    // storeImage = () => {
    //     const storageRef = firebase.storage().ref();
    //     var mountainsRef = storageRef.child('mountains.jpg');
    //     mountainsRef.put(this.state.picturePath).then(function (snapshot) {
    //         console.log('Uploaded a blob or file!');
    //     });
    //
    // };

    storeImage = async () => {
        const uri = this.state.picturePath;
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

        // console.log(firebase.auth().currentUser.email);
        const ref = firebase
            .storage()
            .ref()
            .child("random_lala_" + Math.random());
        const snapshot = await
            ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        let url = await snapshot.ref.getDownloadURL();
        this.setState({picture: url});
    };

    loadImage = () => {
        // Create a reference with an initial file path and name
        var storage = firebase.storage();
        storage.ref().child('mountains.jpg').getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            fetch(url, {
                method: "GET"
            }).then(function (oData) {
                console.log(oData);
            });

            // var xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = function (event) {
            //     var blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();
            //
            // // Or inserted into an <img> element:
            // var img = document.getElementById('myimg');
            // img.src = url;
        }).catch(function (error) {
            // Handle any errors
        });
    };

    storeHighScore = () => {

    };

    setupHighscoreListener = () => {
        firebase.storage().ref('users/' + 123).on('value', (snapshot) => {
            const image = snapshot.val().image;
            console.log("New high score: " + image);
        });
    };

    clearCookies = () => {
        RCTNetworking.clearCookies(() => {
        });
    };
    logout = async () => {
        const clientId = clientId;

        /* Log-Out */
        let accessToken = this.state.accessToken;
        await Google.logOutAsync({clientId, accessToken});

        await firebase.auth().signOut();
        /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
    };

    prepareUserCreation = () => {
        (async () => {
            const {type, idToken, user, accessToken} = await Google.logInAsync({
                clientId: clientId,
                scopes: ["profile", "email"]
            });
            if (type === 'success') {
                this.setState({
                    userName: this.state.userName || user.name,
                    picturePath: this.state.picturePath || user.photoUrl,
                    idToken: idToken, //for auth on server
                    accessToken: accessToken //for google api
                });
                const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential)
                    .then(res => {
                        console.log(res);
                        // user res, create your user, do whatever you want
                    })
                    .catch(error => {
                        console.log("firebase cred err:", error);
                    });
            } else {
                //todo do some error message
            }
        })();

        // (async () => {
        //     const {data} = await Contacts.getContactsAsync();
        //     const contacts = data.map(contact => {
        //         return contact.phoneNumbers && contact.phoneNumbers.map(number => {
        //             return {
        //                 "countryCode": number.countryCode,
        //                 "number": number.digits
        //             }
        //         }).flat();
        //     }).flat().filter(number => !!number);
        //     this.contacts = contacts;
        // })();
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: this.state.picturePath}}/>
                        <Button
                            onPress={this._pickImage}
                            title="Add profile pic"
                            color="#841584"
                        />
                    </View>
                    <View>
                        <TextInput style={styles.textInput}
                                   onChangeText={(userName) => this.setState({userName})}
                                   value={this.state.userName}
                                   placeholder="Your userName"/>
                        <Image style={styles.image} source={{
                            uri: this.state.picture
                        }}/>
                        <TextInput style={styles.textInput}
                                   onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                                   value={this.state.phoneNumber}
                                   placeholder="Your phone number"/>
                        <Button title="save"
                                onPress={this.saveUser}>
                        </Button>

                        <Button title="Authenticate"
                                onPress={this.prepareUserCreation}>
                        </Button>

                        <Button title="clear Cookies"
                                onPress={this.clearCookies}>
                        </Button>
                        <Button title="fetch Image"
                                onPress={this.fetchImage}>
                        </Button>
                        <Button title="store Image"
                                onPress={this.storeImage}>
                        </Button>
                        <Button title="load Image from fire"
                                onPress={this.loadImage}>
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
    const {auth} = state;
    return auth;
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({newUser}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
