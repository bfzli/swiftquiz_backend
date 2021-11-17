/*const multer = require("multer");
const { DB } = require("../config");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: DB,
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = {
  upload,
};
*/

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { DB } = require("../config");

const storage = new GridFsStorage({
  url: DB,
  filename(req, file, next) {
    let lastIndexof = file.originalname.lastIndexOf(".");
    let ext = file.originalname.substring(lastIndexof);
    next(null, `thumbnail-${Date.now()}${ext}`);
  },

  destination(req, file, next) {
    next(null, `${__dirname}/../uploads`);
  },
});

const upload = multer({
  storage,
});

module.exports = {
  upload,
};
