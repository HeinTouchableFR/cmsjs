import nextConnect from 'next-connect';
import multer from 'multer';
import prisma from 'utils/prisma';

const path = require('path');
const FTPStorage = require('multer-ftp');

const url = new URL(process.env.FTP_URL);

const upload = multer({
    storage: new FTPStorage({
        destination: (req, file, options, callback) => {
            const newName = `${process.env.FTP_BASEDIR}/${(`${Math.random().toString(36)}00000000000000000`).slice(2, 10)}${Date.now()}${path.extname(file.originalname)}`;
            callback(null, newName);
        },
        ftp: {
            host: url.host,
            port: url.port || 21,
            secure: false,
            user: url.username,
            password: url.password,
        },
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({
                error: `Sorry something Happened! ${error.message}`,
            });
    },
    onNoMatch(req, res) {
        res.status(405).json({
            error: `Method '${req.method}' Not Allowed`,
        });
    },
});

apiRoute.use(upload.fields([{
    name: 'files',
}]));

apiRoute.post(async (req, res) => {
    if (typeof req.files.files !== typeof undefined) {
        const promises = [];
        const items = [];
        for (const img of req.files.files) {
            const name = img.path.replace(process.env.FTP_BASEDIR, '');
            const data = prisma.images.create({
                data: {
                    path: img.path,
                    originalName: img.originalname,
                    name: name.replace('/', ''),
                    created_at: new Date(),
                },
            });
            promises.push(data);
            data.then((item) => items.push(item));
        }
        Promise.all(promises).then(() => {
            res.status(200).json({
                success: true, data: items,
            });
        });
    }
});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
export default apiRoute;
