const router = require("express").Router();
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const { userAuth } = require("../utils/Auth");
const { upload } = require("../middlewares/uploads");

const prefix = "/:userId/quizzes";

router.get(`${prefix}/my-quizzes/:shortId`, userAuth, async (req, res) => {
  try {
    const redeemCode = await Quiz.findOne({
      redeem_code: req.params.shortId,
    }).populate("created_by", "name profile");
    res.send(redeemCode);
  } catch (error) {
    return res.status(500).json({
      message: "Can't fetch the quiz !",
      success: false,
    });
  }
});


router.put(`${prefix}/update-quiz/:quizId`, userAuth, async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findOneAndUpdate({ _id: req.params.quizId }, {
      created_by: req.params.userId,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      questions: req.body.questions,
    })

    return res.status(200).json({
      success: true,
      message: "Quiz was updated succesfully.",
      updated_quiz: updatedQuiz
    });

  } catch (error) {
    return res.status(500).json({
      message: "Quiz couldn't updated, make sure you've filled all.",
      success: false,
    });
  }
});

router.get(`${prefix}/my-quizzes`, userAuth, async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("created_by", "name username profile");
    /*  if (!quizzes) {
        return res.status(404).json({
          success: false,
          message: "Wow, tranquila, not your quizzes my friend !",
        });
      }*/
    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Quizzes cannot be fetched!",
    });
  }
});

router.post(
  `${prefix}/create-quiz`,
  userAuth,
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const newQuiz = new Quiz({
        created_by: req.params.userId,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        difficulty: req.body.difficulty,
        questions: req.body.questions,
        // thumbnail: req.file.filename
      });

      console.log(newQuiz);
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
