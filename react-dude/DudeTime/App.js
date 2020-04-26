
import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import BaseApp from "./components/BaseApp";
import { Provider } from 'react-redux'
import { persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, {persistor} from "./redux/store";
/*
Reactotron.configure({ host: '192.168.0.241' })
    .useReactNative();*/
export default class App extends React.Component {

    componentDidMount() {
        //Reactotron.connect()
    }

    state = {
        isLoadingComplete: false,
    };

    render() {
       // Reactotron.log('hello from AppContainer');
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                // todo persistaGate can get loading screen
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <BaseApp/>
                    </PersistGate>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),

            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                'beachday': require('./assets/fonts/beachday.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}
