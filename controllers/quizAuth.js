const Quiz = require("../models/Quiz");
const User = require("../models/User");

const createQuiz = async (quiz, res) => {
  try {
    const newQuiz = new Quiz({
      ...quiz,
    });
    await newQuiz.save();
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
};

const fetchQuizes = async (quiz, res) => {
  try {
    const quizes = await Quiz.find().populate({
      path: "category",
      path: "created_by",
      select: ["name"],
    });
    res.send(quizes);
  } catch (error) {
    return res.status(404).json({
      message: "Can't fetch quizes !",
      success: false,
    });
  }
};

module.exports = {
  createQuiz,
  fetchQuizes,
};
