const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const fs = require('fs')
const Grid = require('gridfs-stream')
const { DB } = require("../config");
const { GridFsStorage } = require("multer-gridfs-storage");

const mongoURI=DB

const conn=mongoose.createConnection(mongoURI);

let gfs;
conn.once('open', function(){
  //STREAM INITIALIZING
  gfs=Grid(conn.db,mongoose.mongo)
  gfs.collection('uploads')
})


const storage = new GridFsStorage({
  url: mongoURI,
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
/*
*/

/*

const multer = require("multer");


const filename = (req, file, next) => {
  let lastIndexof = file.originalname.lastIndexOf(".");
  let ext = file.originalname.substring(lastIndexof);
  next(null, `thumbnail-${Date.now()}${ext}`);
};

const destination = (req, file, next) => {
  next(null, `${__dirname}/../uploads`);
};

const upload = multer({
  storage: multer.diskStorage({
    destination: destination,
    filename: filename,
  }),
});

module.exports = {
  upload,
};

*/
