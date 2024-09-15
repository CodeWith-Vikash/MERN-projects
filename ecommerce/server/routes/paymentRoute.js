const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const stripe = Stripe('sk_test_51PyueBC7ONiM7sjbjdz6W3SzFrh8E7LyE4v59zYQbJO6olYBtFpkc98oKHfjiS6Sa7cbIbftX3InNLonkOIIYvSs00Tps5f9PK'); // Replace with your Stripe secret key

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works in the smallest currency unit (cents for USD)
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
