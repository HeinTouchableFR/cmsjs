import * as admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}


export const db = admin.firestore();
export const auth = admin.auth();
