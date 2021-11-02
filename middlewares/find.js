const User = require("../models/User");

const findUser = async (req, res, next) => {
  const user = await User.findById(req.body._id);
  if (!user) {
    return res.status(400).send("Invalid Category");
  }
};

module.exports = {
  findUser,
};
