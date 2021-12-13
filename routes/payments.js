const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const {userAuth} = require("../utils/Auth");

router.post("/coins/", userAuth, async (req, res) => {

    const userId = req.body.userId;
    const coins = req.body.coins;

    var amount;

    switch (coins) {
        case 1000:
            amount = 999;
            break;
        case 5000:
            amount = 2999;
            break;
        case 10000:
            amount = 5999;
            break;
        case 50000:
            amount = 9999;
            break;
    }

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
            metadata: {
                name: "value",
            },
        });
        const clientSecret = paymentIntent.client_secret;

        await User.findOneAndUpdate({ _id: userId }, { $inc: { coins: coins } });

        res.json({ clientSecret, message: "Payment Initiated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/stripe", (req, res) => {
    if (req.body.type === "payment_intent.created") {
        console.log(`${req.body.data.object.metadata.name} initated payment!`);
    }
    if (req.body.type === "payment_intent.succeeded") {
        console.log(`${req.body.data.object.metadata.name} succeeded payment!`);
    }
});

module.exports = router;