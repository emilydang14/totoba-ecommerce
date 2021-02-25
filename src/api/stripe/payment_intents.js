import Stripe from "stripe";

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      console.log("stripe_server", req, res);
      // const { amount, payment_method, receipt_email, metadata } = req.body;
      const { amount, payment_method } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur",
        payment_method,
        // receipt_email,
        // metadata,
      });

      console.log(paymentIntent);

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
      console.log("Payment Intents Err", err);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
