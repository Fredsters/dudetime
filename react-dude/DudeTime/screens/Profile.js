import React from 'react';
import {Button, Image, StyleSheet, TextInput, View,} from 'react-native';
import {connect} from "react-redux";
import colors from "../constants/Colors.js"
import {bindActionCreators} from 'redux';
import {newUser} from "../redux/AuthAction";
import {Contacts, Google} from 'expo';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) {
            this.state = {
                text: ''
            };
        } else {
            this.state = {text: this.props.user.userName};
        }
    }

    onSetImage = () => {
        this.setState({
            image: require("dudetime/assets/images/7.jpg")
        })
    };

    saveUser = () => {
        this.props.newUser({
            userName: this.state.text,
            picturePath: this.state.image
        });
    };

    contacts = () => {
        (async () => {
            const {data} = await Contacts.getContactsAsync();
            console.log(data);
        })();
    };

    authenticate = () => {
        (async () => {
            const clientId = '470121245649-ggnmqsqnek2jj36ob4kqan1k885bkoia.apps.googleusercontent.com';
            const {type, accessToken, user} = await Google.logInAsync({clientId});

            if (type === 'success') {
                /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
                console.log(user);
            }
        })();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={this.state.image}></Image>
                    <Button
                        onPress={this.onSetImage.bind(this)}
                        title="Add profile pic"
                        color="#841584"
                    />
                </View>
                <View>
                    <TextInput style={styles.textInput}
                               onChangeText={(text) => this.setState({text})}
                               value={this.state.text}
                               placeholder="Your userName"/>
                    <Button title="save"
                            onPress={this.saveUser}>
                    </Button>
                    <Button title="Authenticate"
                            onPress={this.authenticate}>
                    </Button>
                    <Button title="Contacts"
                            onPress={this.contacts}>
                    </Button>
                </View>
            </View>
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
