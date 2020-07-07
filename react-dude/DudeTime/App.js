
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
import { Notifications } from 'expo';
import { Vibration, Button } from 'react-native';
export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    componentDidMount() {
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        //todo handle the authorization here
        Notifications.addListener(this._handleNotification);
    }
    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
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
