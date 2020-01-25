import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { createMate } from "../redux/MateActions";
import { fetchUserContacts } from "../redux/AuthAction";
import DudePicker from '../components/DudePicker';
import i18n from "../constants/i18n";
import Colors from '../constants/Colors';
import { styleConstants } from '../Style';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

class CreateMate extends React.Component {

    static navigationOptions = {
        title: "Create a Mate"
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedItems: [],
            tags: []
        };
    }

    async componentDidMount() {
        await this.props.fetchUserContacts()
        this.setState({
            userContacts: this.props.auth.user.userContacts
        });
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems: selectedItems });
    };

    onHandleBlur = event => {
        console.log(event);
    }

    onHandleKeyPress = event => {
        console.log(event);
    }

    onHandleSubmit = event => {
        console.log(event);
    }

    render() {

        if (this.state.userContacts) {
            return (
                <ScrollView style={{
                    flex: 1
                }}>
                    {/* <Button title="create Dummy Mate"
                        onPress={this.props.createMate}>
                    </Button>

                    <Button title="load Contacts Dummy Mate"
                        onPress={this.props.fetchUserContacts}>
                    </Button> */}
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleLabel}>{i18n.t('title')}</Text>
                            <TextInput style={styles.titleInput} placeholder="lalal"></TextInput>
                        </View>

                        <View style={[styles.titleContainer, styles.tagContainer]}>
                            <Text style={styles.titleLabel}>{i18n.t('tags')}</Text>

                            <View>
                                {this.state.tags.map((item, key) => {
                                    <Text style={styles.tag} key={key}>{item}</Text>
                                }
                                )}
                            </View>

                            <TextInput style={[styles.titleInput]} placeholder={i18n.t('addTagDescription')}
                                onBlur={this.onHandleBlur}
                                onKeyPress={this.onHandleKeyPress}
                                onSubmitEditing={this.onHandleSubmit}></TextInput>
                        </View>
                    </View>



                    <DudePicker style={{
                        flex: 1
                    }} participants={this.state.participants} userContacts={this.state.userContacts}></DudePicker>

                </ScrollView>
            );
        } else {
            return <Text>No Users</Text>
        }
    }
}

const mapStateToProps = (state) => {
    const { mate, auth } = state;
    return { mate, auth };
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ createMate, fetchUserContacts }, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        padding: 10,
    },
    titleLabel: {
        fontSize: styleConstants.fontLarge,
        marginBottom: 8
    },
    titleInput: {
        borderColor: Colors.lightGrey,
        fontSize: styleConstants.fontLarge,
        borderWidth: 1,
        borderRadius: 4,
        padding: 8
    },
    tagContainer: {
        alignItems: "flex-start"
    },
    tag: {
        marginLeft: 5,
        marginRight: 5,
        color: Colors.white,
        fontSize: 16
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMate);
