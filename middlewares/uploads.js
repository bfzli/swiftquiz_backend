const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const {DB}=require("../config")
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: DB,
  file: (req, file) => {
    return new Promise((resolve, reject) =>{
      crypto.randomBytes(16,(err,buf)=>{
        if(err){
          return reject(err)
        }
        const filename=buf.toString('hex')+path.extname(file.originalname)
        const fileInfo={
          filename: filename,
          bucketName:'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb("Sorry, pick image files ", false);
  }
};

const upload = multer({ storage, limits:{fileSize:20000000}, fileFilter: filefilter });

module.exports = {
  upload,
};