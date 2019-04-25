import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {createMate} from "../redux/MateActions";

class CreateMate extends React.Component {
    static navigationOptions = {
        title: 'Kuhhaut',
    };

    render() {
        return (
            <View>
                <Button title="create Dummy Mate"
                        onPress={this.props.createMate}>
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const {mate, auth} = state;
    return {mate, auth};
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({createMate}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMate);
