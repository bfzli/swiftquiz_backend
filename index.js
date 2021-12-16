const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const { DB } = require("./config");
const cookieSession = require("cookie-session");
const session = require("express-session");

const PORT = process.env.PORT || 5000;

const mongoURI = DB;

const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//APP INITIALIZING
const app = exp();

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to SwiftQuiz API",
    success: true,
  });
});

app.get("/:filename", async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

//Session
app.use(
  session({
    secret: "swift",
    resave: false,
    saveUninitialized: false,
  })
);

//MIDDLEWARE
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
app.use(passport.session());
require("./middlewares/passport")(passport);
//maxAge = 1day
// app.use(
//   cookieSession({ name: "session", keys: "swift", maxAge: 24 * 60 * 60 * 100 })
// );

// Router Middleware
app.use("/api/user", require("./routes/users"));
app.use("/api/user/categories", require("./routes/categories"));
app.use("/api/user", require("./routes/quizes"));
app.use("/api/user/pay", require("./routes/payments"));
app.use("/api/terminal", require("./routes/commands"));
app.use("/auth", require("./routes/social"));
app.use("/api/user", require("./routes/conversations"));
app.use("/api/user", require("./routes/messages"));

const startApp = async () => {
  try {
    //CONN WITH DB
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    success({
      message: `Successfully connected with DB \n${DB}`,
      badge: true,
    });

    //PORT

    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({ message: `Unable to connect with DB \n${err}`, badge: true });
    startApp();
  }
};

startApp();
