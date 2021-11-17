const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const filename = (req, file, next) => {
  let lastIndexof = file.originalname.lastIndexOf(".");
  let ext = file.originalname.substring(lastIndexof);
  next(null, `img-${Date.now()}${ext}`);
};

const destination = (req, file, next) => {
  next(null, `${__dirname}/../uploads`);
};

const upload = multer({
  storage: multer.diskStorage({ destination: destination, filename: filename }),
});

module.exports = {
  upload,
};
