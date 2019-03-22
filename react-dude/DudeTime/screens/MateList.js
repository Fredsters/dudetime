import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {fetchMates} from "../redux/MateActions";
import {connect} from "react-redux";
import MateItem from "../components/MateItem";

class MateList extends React.Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this.props.dispatch(fetchMates());
    }

    render() {
        const {error, loading, mates} = this.props;

        if (error) {
            return <Text>Error! {error.message}</Text>;
        }

        if (loading) {
            return <Text>Loading...</Text>;
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={mates}
                    renderItem={(mate) => (
                        <MateItem mate={mate}/>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    mates: state.mates.items,
    loading: state.mates.loading,
    error: state.mates.error
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default connect(mapStateToProps)(MateList);
