import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {fetchMates} from "../redux/MateActions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import MateItem from "../components/MateItem";

class MateList extends React.Component {
    // static navigationOptions = {
    //     header: null,
    // };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         "hallo": 123,
    //         "was": 5435
    //     };
    // }

    componentDidMount() {
        this.props.fetchMates();
    }

    render() {
        const {error, loading, mates} = this.props;

        if (error) {
            return <Text>Error! {error.message}</Text>;
        }

        console.log(this.state);
        if (loading) {
            return <Text>Loading...</Text>;
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={mates}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) =>
                        <MateItem
                            title={item.title}
                            description={item.description}
                            item={item}
                        />}
                />
            </View>
        );
    }
}

// const mapStateToProps = state => ({
//     mates: state.mates.items,
//     loading: state.mates.loading,
//     error: state.mates.error
// });

const mapStateToProps = (state) => {
    const {mate} = state;
    return mate;
};

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchMates }, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MateList);
