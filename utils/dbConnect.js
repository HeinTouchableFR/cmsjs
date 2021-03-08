import * as admin from 'firebase-admin'

const serviceAccount = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY,
  project_id: process.env.GCLOUD_PROJECT_ID,
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.DATABASEURL
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}


export const db = admin.firestore();
export const auth = admin.auth();
