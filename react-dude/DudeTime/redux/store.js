import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './RootReducer';
import thunk from "redux-thunk";
import { persistReducer } from 'redux-persist';
import { applyMiddleware, createStore } from "redux";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    blacklist: ['mate']
};

const pReducer = persistReducer(persistConfig, rootReducer);

export default createStore(
    pReducer,
    applyMiddleware(thunk)
);