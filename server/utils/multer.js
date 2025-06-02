import multer from "multer";

let storage = multer.memoryStorage();

let fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("only image image uploaded"), false);
  }
};

let upload = multer({ storage, fileFilter });

export default upload;
