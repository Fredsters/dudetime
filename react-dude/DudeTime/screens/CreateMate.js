import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {createMate} from "../redux/MateActions";
import {fetchUsers} from "../redux/AuthAction";

import MultiSelect from 'react-native-multiple-select';

class CreateMate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedItems: []
        };
    }

    async componentDidMount() {
        await this.props.fetchUsers();

        this.setState({
            userContacts: this.props.auth.user.userContacts
        });
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({selectedItems: selectedItems});
    };

    render() {

        if (this.state.userContacts) {
            return (
                <View>
                    <Button title="create Dummy Mate"
                            onPress={this.props.createMate}>
                    </Button>


                    <MultiSelect
                        // hideTags
                        items={this.state.userContacts}
                        uniqueKey="_id"
                        ref={(component) => {
                            this.multiSelect = component
                        }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={(text) => console.log(text)}
                        // altFontFamily="ProximaNova-Light"
                        // tagRemoveIconColor="#CCC"
                        // tagBorderColor="#CCC"
                        // tagTextColor="#CCC"
                        // selectedItemTextColor="#CCC"
                        // selectedItemIconColor="#CCC"
                        // itemTextColor="#000"
                        displayKey="userName"
                        // searchInputStyle={{color: '#CCC'}}
                        // submitButtonColor="#CCC"
                        submitButtonText="Submit"
                    />
                </View>
            );
        } else {
            return <Text>No Users</Text>
        }
    }
}

const mapStateToProps = (state) => {
    const {mate, auth} = state;
    return {mate, auth};
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({createMate, fetchUsers}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMate);
