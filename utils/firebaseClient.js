import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.GCLOUD_PROJECT_ID,
    storageBucket: process.env.GCLOUD_STORAGE_BUCKET_URL,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export {firebase};
