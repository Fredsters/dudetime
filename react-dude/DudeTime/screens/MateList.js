import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {fetchMates} from "../redux/MateActions";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import MateItem from '../components/MateItem';

// import MateItem from "../components/MateItem";

class MateList extends React.Component {

    componentDidMount() {
        if (this.props.auth && this.props.auth.user && this.props.auth.user.id) {
            this.props.fetchMates();
        } else {
            const {navigate} = this.props.navigation;
            //todo navigate to user create screen, get phoneNumer, put in firstName, LastName, profile pic and 
            navigate("Profile");
        }

    }

    render() {
        const {error, loading, mates} = this.props.mate;

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
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) =>
                        <MateItem
                            item={item}
                        />
                    }
                />
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
        ...bindActionCreators({fetchMates}, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MateList);
