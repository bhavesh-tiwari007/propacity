const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

const {
    S3Client,
    PutObjectCommand,
    HeadObjectCommand,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// let s3 = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//     sslEnabled: false,
//     s3ForcePathStyle: true,
//     signatureVersion: 'v4',
//   });


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION // Specify your AWS region
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, callback) {
            callback(null, { fieldName: file.fieldname });
        },
        key: function (req, file, callback) {
            callback(null, 'uploads/' + Date.now() + '-' + file.originalname);
        }
    })
})

const uploadFileMulter = () => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: function (req, file, callback) {
                callback(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, `uid${req.user.id}/${req.body.folder}/${Date.now().toString()}`); // Use Date.now() as unique key for the file
            }
        })
    });
    // multer({
    //     storage: multerS3({
    //       s3: s3,
    //       bucket: process.env.AWS_BUCKET_NAME,
    //       contentType: multerS3.AUTO_CONTENT_TYPE,
    //       acl: 'public-read',
    //       metadata: function (req, file, cb) {
    //         cb(null, { fieldName: file.fieldname });
    //       },
    //       key: function (req, file, cb) {
    //         cb(null, `uid${req.user.id}/${req.body.folder}/${Date.now().toString()}`);
    //       },
    //     }),
    //   });
}

async function createFolderInS3(Key) {
    const client = new S3Client();
    const command = new PutObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key });
    return client.send(command);
}

async function existsFolderInS3(Key) {
    const client = new S3Client();
    const command = new HeadObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key });

    try {
        await client.send(command);
        return true;
    } catch (error) {
        if (error.name === "NotFound") {
            return false;
        } else {
            throw error;
        }
    }
}

async function createFolderIfNotExist(Bucket, Key) {
    if (!(await existsFolder(Bucket, Key))) {
        return createFolder(Bucket, Key);
    }
}

async function deleteFolder(Bucket, Key) {
    const client = new S3Client();
    const command = new DeleteObjectCommand({ Bucket, Key });
    return client.send(command);
}

module.exports = {
    uploadFileMulter,
    createFolderInS3,
    existsFolderInS3,
    createFolderIfNotExist,
    deleteFolder
};