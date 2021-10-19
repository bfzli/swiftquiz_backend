const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");

//
const { DB, PORT } = require("./config");

//APP INITIALIZING
const app = exp();

//MIDDLEWARE
app.use(cors());

app.use(bp.json());

//User Router Middleware
app.use("/api/users", require("./routes/users"));

//
const startApp = async () => {
  try {
    //CONN WITH DB
    await connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
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
