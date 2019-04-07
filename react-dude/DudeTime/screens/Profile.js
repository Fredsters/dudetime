import React from 'react';
import {
    Image,
    TextInput,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from "react-redux";
import colors from "../constants/Colors.js"
import { bindActionCreators } from 'redux';
import { newUser } from "../redux/AuthAction";
import { Contacts } from 'expo';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        if (!(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object)) {
            this.state = {
                text: ''
            };
        } else {
            this.state = { text: this.props.user.userName };
        }
    }

    onSetImage = () => {
        this.setState({
            image: require("dudetime/assets/images/7.jpg")
        })

        // (async () => {
        //     const { data } = await Contacts.getContactsAsync();
        //     console.log(data);
        // })();
        // Contacts.getContactsAsync().then((data) => {
        //     console.log(data);
        // });

    };

    saveUser = () => {
        this.props.newUser({
            userName: this.state.text,
            picturePath: this.state.image
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer} >
                    <Image style={styles.image} source={this.state.image}></Image>
                    <Button
                        onPress={this.onSetImage.bind(this)}
                        title="Add profile pic"
                        color="#841584"
                    />
                </View>
                <View>
                    <TextInput style={styles.textInput}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        placeholder="Your userName" />
                    <Button title="save"
                        onPress={this.saveUser}>
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
    const { auth } = state;
    return auth;
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ newUser }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);