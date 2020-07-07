import * as firebase from 'firebase';
import { firebaseConfig } from "../constants/network";
import UUIDGenerator from 'react-native-uuid-generator';

firebase.initializeApp(firebaseConfig);

firebase.uploadImage = async (blob) => {
    try {
        //todo doesn't work, uuid is undefined
        const uuid = await UUIDGenerator.getRandomUUID();
        const ref = firebase
            .storage()
            .ref()
            .child(`${uuid}-${new Date()}`);
        const snapshot = await ref.put(blob);
        return await snapshot.ref.getDownloadURL();
    } catch (ex) {
        alert('Upload failed, sorry :(');
        console.log("Error retrieving", ex);
    }
};

firebase.login = async (idToken, accessToken) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    return firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(res => {
            //do nothing
        })
        .catch(error => {
            console.log("firebase cred err:", error);
            alert("The authentication failed, dammit!!");
        });
};

export default firebase;
