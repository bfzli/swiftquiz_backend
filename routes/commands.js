const router = require("express").Router();

router.get(
    "/:actionType/:actionModel/:actionTarget",
    async (req, res) => {
        const actionType = req.params.actionType.toLowerCase()
        const actionModel = req.params.actionModel.toLowerCase()
        const actionTarget = req.params.actionTarget.toLowerCase()

        switch (actionType) {
            case 'delete':
                console.log('delete')
                break;

            case 'add':
                console.log('delete')
                break;
        }

        switch (actionModel) {
            case 'user':
                console.log('user')
                break;

            case 'quiz':
                console.log('quiz')
                break;
        }

        console.log(actionTarget)

        // const user = req.params.userId;
        // try {
        //   await User.findAndDelete({_id: user});
        //   return res.status(201).json({
        //     message: "Successfully deleted user !",
        //     success: true,
        //   });
        // } catch (error) {
        //   return res.status(500).json({
        //     message: "This user is not allowed to be deleted!",
        //     success: false,
        //   });
        // }
    }
);

module.exports = router;
