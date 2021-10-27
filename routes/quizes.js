const router = require("express").Router();

router.post('/add-quiz', async (req, res) => {
        await quiz(req.body, "quiz", res);
 
});
module.exports = router;
