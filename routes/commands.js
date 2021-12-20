const router = require("express").Router();
const User = require("../models/User");

router.delete("/delete",
    async (req, res) => {
        const _model = req.body.model.toLowerCase()
        const _target = req.body.target.toLowerCase()
        var currentTarget;

        switch (_model) {
            case 'user':
                try {
                    currentTarget = await User.findOneAndDelete({ username: _target })

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
                console.log('quiz')
                break;
        }



    }
);


router.put("/add",
    async (req, res) => {
        const _model = req.body.model.toLowerCase()
        const _target = req.body.target.toLowerCase()
        const _value = req.body.value.toLowerCase()

        var currentTarget;

        switch (_model) {
            case 'coins':
                try {
                    currentTarget = await User.findOneAndUpdate(
                        { username: _target },
                        { $inc: { coins: _value }}
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
