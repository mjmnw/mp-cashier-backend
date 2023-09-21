const multer = require("multer");
const fs = require("fs");

const defaultPath = "public";
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const isDirectoryExist = fs.existsSync(defaultPath);

        if (!isDirectoryExist) {
            await fs.promises.mkdir(defaultPath, { recursive: true });
        }

        cb(null, `${defaultPath}`);
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        const uniqueSuffix =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            `.${extension}`;
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

// Setup File Filter
var fileFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype.split("/")[0] === "image") {
        // Accept
        cb(null, true);
    } else if (file.mimetype.split("/")[0] !== "image") {
        // Reject
        cb(new Error("File Must Be Image!"));
    }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
