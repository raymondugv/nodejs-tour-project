const mime = require("mime-types");
const multer = require("multer");
const { uuid } = require("uuidv4");

const uploadConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images/");
	},
	filename: (req, file, cb) => {
		cb(null, uuid() + "." + mime.extension(file.mimetype));
	},
});

module.exports = uploadConfig;
