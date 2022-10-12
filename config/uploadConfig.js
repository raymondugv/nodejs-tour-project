import { extension } from "mime-types";
import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";

const uploadConfig = diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images/");
	},
	filename: (req, file, cb) => {
		cb(null, uuid() + "." + extension(file.mimetype));
	},
});

export default uploadConfig;
