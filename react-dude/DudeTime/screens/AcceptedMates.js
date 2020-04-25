import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { fetchMates } from "../redux/MateActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Colors from "../constants/Colors";
import MateList from '../components/MateList';

class AcceptedMates extends React.Component {

    static navigationOptions = {
        tabBarLabel: "Dudecepted"
    };

    render() {
        const { error, loading, mates } = this.props.mate;
        if (error) {
            return <Text>Error! {error.message}</Text>;
        }
        // if (loading) {
        //     return <Text>Loading...</Text>;
        // }
        return (
            <View style={styles.container}>
                <MateList mates={mates}/>
                <Button title="load Mates" onPress={this.props.fetchMates} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { mate, auth } = state;
    return { mate, auth };
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchMates }, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.grey
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedMates);
