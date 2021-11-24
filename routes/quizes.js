const router = require("express").Router();
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const { userAuth } = require("../utils/Auth");
const { fetchQuizes } = require("../controllers/quizAuth");
const { upload } = require("../middlewares/uploads");

const prefix = "/:userId/quizzes";

router.get(`${prefix}/my-quizzes/:shortId`,userAuth,async (req, res)=>{
  try {
    const redeemCode = await Quiz.findOne({redeem_code:req.params.shortId}).populate({
      path: "created_by",
      select: "name",
    });
    res.send(redeemCode);
  } catch (error) {
    return res.status(500).json({
      message: "Can't fetch the quiz !",
      success: false,
    });
  }
})

router.get(`${prefix}/my-quizzes`, userAuth, async (req, res) => {
  await fetchQuizes(req.body, res);
});

router.get(`${prefix}/my-quizzes/:id`, userAuth, async (req, res) => {
  try {
    const quizById = await Quiz.findById(req.params.id).populate({
      path: "created_by",
      select: "name",
    });
   return res.send(quizById);
  } catch (error) {
    return res.status(500).json({
      message: "Can't fetch the quiz !",
      success: false,
    });
  }
});

router.post(
  `${prefix}/create-quiz`, userAuth,async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const newQuiz = new Quiz({
        ...req.body,
       // thumbnail: req.file.filename,
      });

      console.log(newQuiz)
      await newQuiz.save();
      user.quizzes.push(newQuiz._id);
      await user.save();
      
      return res.status(201).json({
        message: "Finally , a fucking quiz created properly !",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Can't save this quiz try again, check if it already exists",
        success: false,
      });
    }
  }
);

router.delete(`${prefix}/my-quizzes/:id`, userAuth, async (req, res) => {
  try {
   await Quiz.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      message: "Quiz deleted successfully !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't delete the quiz right now !",
      success: false,
    });
  }
});

module.exports = router;
