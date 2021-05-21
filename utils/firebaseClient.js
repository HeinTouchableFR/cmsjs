import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = eval(`(${process.env.FIREBASE_CONFIG})`);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
