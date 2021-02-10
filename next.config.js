module.exports = {
  env: {
    MONGO_URI: "mongodb+srv://dev:dev@dev.0flva.mongodb.net/cmsjs",
    URL: "https://cmsjs.aymericlhomme.fr",
    //URL: 'http://localhost:3000',
    GCLOUD_PROJECT_ID: "cmsjs-fa640",
    GCLOUD_APPLICATION_CREDENTIALS:
      "https://cmsjs.aymericlhomme.fr/pages/api/services/cmsjs-fa640-firebase-adminsdk-nubd4-7fa4af8ee5.json",
    GCLOUD_STORAGE_BUCKET_URL: "cmsjs-fa640.appspot.com",
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
