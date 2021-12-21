const router = require("express").Router();
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const { userAuth, checkRole } = require("../utils/Auth");

router.delete(
    "/delete",
    userAuth,
    checkRole(["admin"]),
    async (req, res) => {
        const _model = req.body.model.toLowerCase()
        const _target = req.body.target.toLowerCase()
        const _value = req.body.value
        var currentTarget;

        switch (_model) {
            case 'user':
                if (_target === "*")
                    try {
                        await User.find({}).then(users => {
                            userCount = users.length
                            users.forEach(async (user) => {
                                await User.findOneAndDelete(
                                    { role: "user" }
                                );

                                await Quiz.findOneAndDelete(
                                    { created_by: user._id }
                                )
                            })
                        });

                        return res.status(201).json({
                            message: `All users were deleted.`,
                            success: true,
                        });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to delete all users!`,
                            success: false,
                        });
                    }
                else
                    try {
                        currentTarget = await User.findOneAndDelete({ username: _target })

                        await Quiz.find({}).then(quizzes => {
                            quizzes.forEach(async (user) => {
                                await Quiz.findOneAndDelete(
                                    { created_by: user._id }
                                );
                            })
                        })

                        if (!currentTarget) {
                            return res.status(404).json({
                                message: `User with handle @${_target} doesn't exist?`,
                                success: true,
                            });
                        }

                        else
                            return res.status(201).json({
                                message: `Succesfully deleted the user with handle @${_target}.`,
                                success: true,
                            });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to delete the user with handle @${_target}!`,
                            success: false,
                        });
                    }
            case 'quiz':
                if (_target === "*")
                    try {
                        var quizCount = 0;

                        await Quiz.find({}).then(quizzes => {
                            quizCount = quizzes.length
                            quizzes.forEach(async (quiz) => {
                                await Quiz.findByIdAndDelete(quiz._id);
                            })
                        });

                        return res.status(201).json({
                            message: `${quizCount} quizzes were deleted.`,
                            success: true,
                        });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to delete ${quizCount} quizzes!`,
                            success: false,
                        });
                    }

                else
                    try {
                        const currentQuiz = await Quiz.findByIdAndDelete(_target);

                        if (!currentQuiz) {
                            return res.status(404).json({
                                message: `Quiz with ID: ${_target}, doesn't exist?`,
                                success: true,
                            });
                        }

                        else
                            return res.status(201).json({
                                message: `Succesfully deleted the quiz with ID: ${_target}.`,
                                success: true,
                            });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to delete the quiz with the ID: ${_target}!`,
                            success: false,
                        });
                    }

            case 'coin':
                if (_target === "*")
                    try {
                        var coinCount = 0;
                        var userCount = 0;

                        await User.find({}).then(users => {
                            userCount = users.length

                            users.forEach(async (user) => {
                                coinCount = coinCount + user.coins

                                await User.findByIdAndUpdate(
                                    user._id,
                                    { "$set": { coins: 0 } },
                                );
                            })
                        });

                        return res.status(201).json({
                            message: `${coinCount} coins were deleted from ${userCount} users.`,
                            success: true,
                        });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to delete ${quizCount} quizzes!`,
                            success: false,
                        });
                    }

                else
                    try {
                        const currentUser = await User.findOneAndUpdate(
                            { username: _target },
                            { "$inc": { coins: -_value } },
                        )

                        if (!currentUser) {
                            return res.status(404).json({
                                message: `${_value} coins couldn't be deleted because this user doesn't exist?`,
                                success: true,
                            });
                        }

                        else
                            return res.status(201).json({
                                message: `Succesfully deleted from @${_target} ${_value} coins.`,
                                success: true,
                            });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to delete ${_value} coins from ${_target}!`,
                            success: false,
                        });
                    }

        }

    }
);


router.put(
    "/add",
    userAuth,
    checkRole(["admin"]),
    async (req, res) => {
        const _model = req.body.model.toLowerCase()
        const _target = req.body.target.toLowerCase()
        const _value = req.body.value

        var currentTarget;

        switch (_model) {
            case 'coin':
                if (_target === "*") {
                    try {
                        await User.find({}).then(users =>
                            users.forEach(async (user) => {
                                await User.findByIdAndUpdate(
                                    user._id,
                                    { "$inc": { coins: _value } },
                                );
                            })
                        );

                        return res.status(201).json({
                            message: `${_value} coins were added to all user.`,
                            success: true,
                        });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to add ${_value} coins to all the users!`,
                            success: false,
                        });
                    }
                }
                else
                    try {
                        currentTarget = await User.findOneAndUpdate(
                            { username: _target },
                            { $inc: { coins: _value } }
                        );

                        if (!currentTarget) {
                            return res.status(404).json({
                                message: `${_value} coins couldn't be added to user with handle @${_target} beacuse it doesn't exist?`,
                                success: true,
                            });
                        }

                        else
                            return res.status(201).json({
                                message: `${_value} coins were added to user with handle @${_target}.`,
                                success: true,
                            });

                    } catch (error) {
                        return res.status(500).json({
                            message: `Something went wrong while trying to add ${_value} coinsto the user with handle @${_target}!`,
                            success: false,
                        });
                    }

            case 'quiz':
                console.log('quiz')
                break;
        }

    }
);

module.exports = router;
