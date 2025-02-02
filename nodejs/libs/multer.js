const multer = require("multer");

function generateFilter(props) {
    let { allowedMimeType } = props;
    return multer({
        fileFilter: (req, file, callback) => {
            if (!allowedMimeType.includes(file.mimetype)) {
                const err = new Error(
                    `Only ${allowedMimeType.join(", ")} allowed to upload`
                );
                return callback(err, false);
            }
            callback(null, true);
        },
        onError: (err, next) => {
            next(err);
        },
    });
}

module.exports = {
    image: generateFilter({
        allowedMimeType: ["image/jpg", "image/png", "image/jpeg"],
    }),
};