import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { fetchOpenMates } from "../redux/MateActions";
import { toggleCreateButton } from "../redux/UiActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Colors from "../constants/Colors";
import MateList from '../components/MateList';
import Toast, {DURATION} from 'react-native-easy-toast'

class NewMates extends React.Component {

    constructor(props) {
        super(props);
        this.toast = React.createRef();
    }

    componentDidMount(props) {
        this.props.fetchOpenMates({
            open: true,
            rejected: false,
            accepted: false,
            own: false
        });
    }

    onScrollDirectionChange(isUpwards) {
        this.props.toggleCreateButton(isUpwards);
    }

    componentDidUpdate(props) {
        if(this.props.mate.type === "CREATE_MATE") {
            this.toast.current.show('Mate Created!', 2000);
        }
    }

    static navigationOptions = {
        tabBarLabel: "Open Mates"
    };

    render() {
        const { error, loading, openMates } = this.props.mate;
        if (error) {
            return <Text>Error! {error.message}</Text>;
        }
        // if (loading) {
        //     return <Text>Loading...</Text>;
        // }
        return (
            <View style={styles.container}>
                <MateList mates={openMates} onScrollDirectionChange={this.onScrollDirectionChange.bind(this)}/>
                <Toast ref={this.toast} style={styles.toast} textStyle={styles.toastText} fadeInDuration={500} position='bottom' opacity={0.9} positionValue={300}/>
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
        ...bindActionCreators({ fetchOpenMates, toggleCreateButton }, dispatch)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.grey
    },
    toast: {
        paddingVertical: 20,
        paddingHorizontal: 100,
        backgroundColor: Colors.green,
        borderRadius: 0,
        shadowRadius: 8,
        shadowColor: Colors.black,
        shadowOffset: {width: 20, height: 20},
        shadowOpacity: 0.9
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMates);
