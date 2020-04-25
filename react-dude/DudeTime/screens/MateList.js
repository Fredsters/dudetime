import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { fetchMates } from "../redux/MateActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Colors from "../constants/Colors";
import MateItem from '../components/MateItem';

// import MateItem from "../components/MateItem";

class MateList extends React.Component {

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
                <FlatList
                    data={mates}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) =>
                        <MateItem
                            item={item}
                        />
                    }
                />
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
        padding: 15
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MateList);
