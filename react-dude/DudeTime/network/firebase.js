import UUIDGenerator from 'react-native-uuid-generator';
import * as firebase from 'firebase';

const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);

firebase.uploadImage = async (blob) => {
    try {
        return UUIDGenerator.getRandomUUID().then(async (uuid) => {
            const ref = firebase
                .storage()
                .ref()
                .child(`${uuid}-${new Date()}`);
            const snapshot = await ref.put(blob);
            return await snapshot.ref.getDownloadURL();
        });
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
