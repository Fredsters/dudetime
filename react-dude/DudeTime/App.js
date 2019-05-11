
import React from 'react';
import { AsyncStorage, Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon, Expo } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './redux/RootReducer';
import Reactotron from 'reactotron-react-native'

Reactotron.configure({ host: '192.168.0.241' })
    .useReactNative();

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    pReducer,
    applyMiddleware(thunk)
);
const persistor = persistStore(store);

export default class App extends React.Component {

    componentDidMount() {
        Reactotron.connect()
    }

    state = {
        isLoadingComplete: false,
    };

    render() {
        Reactotron.log('hello from AppContainer');
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
                        <View style={styles.container}>
                            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                            <Button title="purge persist store"
                                onPress={this.purgePersistor}>
                            </Button>
                            <AppNavigator
                                screenProps={{
                                    mateList: { "hello": "some data" }
                                }} />
                        </View>
                    </PersistGate>
                </Provider>
            );
        }
    }

    purgePersistor = async () => {
        persistor.purge();
    };

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
