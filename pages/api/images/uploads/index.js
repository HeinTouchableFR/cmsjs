import nextConnect from "next-connect";
import multer from "multer";
import {db} from 'utils/dbConnect';

const sharp = require("sharp");
var path = require("path");


const {Storage} = require("@google-cloud/storage");

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    },
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

const upload = multer({
    storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
});

apiRoute.use(
    upload.fields([{name: "files"}])
);

apiRoute.post(async (req, res) => {

    if (typeof req.files["files"] !== typeof undefined) {
        const promises = []
        const items = []
        for (const img of req.files["files"]) {
            const newName = (Math.random().toString(36) + "00000000000000000").slice(2, 10) + Date.now() + path.extname(img.originalname);
            const blob = bucket.file(newName);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: img.mimetype,
                },
            });
            blobWriter.on("error", (err) => console.log(err));
            promises.push(
                new Promise((resolve, reject) => {
                    blobWriter.on("finish", async () => {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                            bucket.name
                        }/o/${encodeURI(blob.name)}?alt=media`;
                        const pic = {
                            url: publicUrl,
                            originalName: img.originalname,
                            name: newName,
                            size: img.size,
                            created_at: new Date(),
                            products: []
                        }
                        db.collection('images').add(pic).then(data => {
                            items.push({
                                _id: data.id,
                                ...pic
                            })
                            resolve()
                        })
                    });
                })
            )

            const resize = await sharp(img.buffer).jpeg().toBuffer();
            blobWriter.end(resize);
        }
        Promise.all(promises).then(() => {
            res.status(200).json({success: true, data: items})
        })
    }
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
