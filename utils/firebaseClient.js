import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var firebaseConfig = eval("("+process.env.FIREBASE_CONFIG+")");
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
