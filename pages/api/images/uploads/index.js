import {NextApiRequest, NextApiResponse} from "next";
import nextConnect from "next-connect";
import multer from "multer";

import Image from "../../../../models/Image";

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
import fs from "fs";
import Attribut from "../../../../models/Attribut";

const oneMegabyteInBytes = 1000000;

const upload = multer({
    limits: {fileSize: oneMegabyteInBytes * 2},
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
        for (const img of req.files["files"]) {
            const newName = (Math.random().toString(36) + "00000000000000000").slice(2, 10) + Date.now() + path.extname(img.originalname);
            const blob = bucket.file(newName);
            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: img.mimetype,
                },
            });
            blobWriter.on("error", (err) => console.log(err));
            blobWriter.on("finish", async () => {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                    bucket.name
                }/o/${encodeURI(blob.name)}?alt=media`;
                const image = new Image({
                    url: publicUrl,
                });
                image.save().then(data => res.status(200).json({success: true, data: data}))
            });
            const resize = await sharp(img.buffer).jpeg().toBuffer();
            blobWriter.end(resize);
        }
    }
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
