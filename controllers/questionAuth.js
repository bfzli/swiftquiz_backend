const Question = require("../models/Question");

const createQuestion = async (question, res) => {
  try {
    const newQuestion = new Question({
      ...question,
    });
    await newQuestion.save();
    return res.status(201).json({
      message: "Finally , a fucking question is added !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Can't add this question man, wow, tough one .",
      success: false,
    });
  }
};

const fetchQuestions = async (question, res) => {
  try {
    const questions = await Question.find({}).populate({
      path: "quiz_id",
      select: ["title"],
    });
    res.send(questions);
  } catch (error) {
    return res.status(404).json({
      message: "Can't fetch questions !",
      success: false,
    });
  }
};

module.exports = {
  createQuestion,
  fetchQuestions,
};
