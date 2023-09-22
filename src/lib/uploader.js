const multer = require("multer");
const { nanoid } = require("nanoid");

const fileUploader = ({
    destinationFolder = "profilePictures",
    prefix = "AVATAR",
    fileType = "image",
    fileSizeLimit = 1000000,
}) => {
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../public/${destinationFolder}`);
        },
        filename: (req, file, cb) => {
            const fileExtension = file.mimetype.split("/")[1];
            const filename = `${prefix}_${nanoid()}.${fileExtension}`;
            cb(null, filename);
        },
    });
    const uploader = multer({
        storage: storageConfig,
        fileFilter: (req, file, cb) => {
            console.log(file);

            if (file.mimetype.split("/")[0] != fileType) {
                return cb(null, false);
            }

            cb(null, true);
        },
        limits: {
            fileSize: fileSizeLimit,
        },
    });

    return uploader;
};

module.exports = fileUploader;
