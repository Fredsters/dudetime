import React from 'react';
import { connect } from "react-redux";
import TabView from '../components/TabView';
import { fetchCurrentUser } from "../redux/AuthAction";
// import { createDummyMate } from "../redux/MateActions";
import { bindActionCreators } from 'redux';
import DudeHeader from '../components/DudeHeader';
import Colors from '../constants/Colors';
import * as Font from 'expo-font';

class MateTabView extends React.Component {

    componentDidMount() {
        console.log("componentDidMount");
        //const a = await 
        this.props.fetchCurrentUser();
        // this.props.createDummyMate();

        console.log("aaha");
        this.setState({
            auth: this.props.auth
        });
        this.props.navigation.setParams({ auth: this.props.auth });
        this.props.navigation.navigate("Profile");
        // this.state = {
        //     userName: this.props.user.userName,
        //     picturePath: this.props.user.picturePath
        // };
    }

    constructor(props) {
        super(props);
        this.state = {
            auth: {}
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: Colors.grey,
            },
            headerTintColor: Colors.green,
            headerTitle: ()=> {
                const auth = navigation.getParam("auth");
                if(auth && auth.user) {
                    return <DudeHeader pic={auth.user.picturePath} navigation={navigation}/>
                }
            }
          };
      };

    render() {
        return <TabView/>;
    };
    
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return { auth };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchCurrentUser }, dispatch); 
}

export default connect(mapStateToProps, mapDispatchToProps)(MateTabView);
