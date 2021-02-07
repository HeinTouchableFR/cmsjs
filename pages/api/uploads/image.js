import dbConnect from "../../../utils/dbConnect";
import Image from "../../../models/Image";
const { Storage } = require("@google-cloud/storage");

dbConnect();
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const img = req.body;
        console.log(req.body);
        const blob = bucket.file(img.originalname);
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: img.mimetype,
          },
        });
        blobWriter.on("error", (err) => console.log(err));
        await blobWriter.on("finish", async () => {
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;
          const image = new Image({
            url: publicUrl,
          });
          console.log(publicUrl);
          await image
            .save()
            .then((data) => res.status(200).json({ success: true, data: data }))
            .catch((err) =>
              res.status(400).json({ success: false, errors: err })
            );
        });
        const resize = await sharp(img.buffer).jpeg().toBuffer();
        blobWriter.end(resize);
      } catch (e) {
        res.status(400).json({ success: false, erreurs: e });
      }
      break;
    default:
      res
        .status(400)
        .json({ success: false, errors: "Cette méthode n'est pas disponible" });
      break;
  }
};
