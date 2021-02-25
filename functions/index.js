const functions = require("firebase-functions");

const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const express = require("express");

const stripe = require("stripe")(
  "sk_test_51Heh7tHldi2cSykxbn6P0slXJINJKg5aJIJgGJw8jbMQP9nbsmUmnD5uHDyrltgkNe51OTZPKx9Ziyc5j1SlK5nQ00WTUsXlW9"
);

//sending response function
const send = (res, code, body) => {
  res.send({
    statusCode: code,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body),
  });
};

//app needs to use express and cors
const createCheckOutSessionApp = express();
createCheckOutSessionApp.use(cors);

//get data from front-end
const createCheckOutSession = async (req, res) => {
  functions.logger.log("create checkout session start");

  const body = JSON.parse(req.body);
  functions.logger.log("req.body", req.body);

  // session data collected
  const line_items = body.line_items;
  //image ?? how to get
  const customerEmail = body.customerEmail;
  const metadata = body.metadata;

  // Order dat can be send to firestore here ??
  functions.logger.log("before createcheckoutsession await");
  await stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: line_items,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: metadata,
      // We will add the only app page for simplicity
      success_url: "https://totoba-2daa8.web.app/order-success",
      cancel_url: "https://totoba-2daa8.web.app/order-canceled",
    })
    .then((session) => {
      functions.logger.log("Session successfull!");
      functions.logger.log("Session successfull!-sessionid", session.id);
      // Getting the session id
      var sessionId = session.id;

      // Store sessionID to order in firestore
      // Sending the session id to front-end
      send(res, 200, {
        sessionId: sessionId,
      });
      functions.logger.log(
        "[/functions][index.js] Create CheckOut Session",
        session
      );
      return;
    })
    .catch((error) => {
      functions.logger.log(
        "[/functions][index.js] Create CheckOut Session Err",
        error
      );
      send(res, 500, { error });
      return;
    });
};

// Creating a route
createCheckOutSessionApp.post("/", (req, res) => {
  try {
    createCheckOutSession(req, res);
  } catch (e) {
    functions.logger.log("[/functions][index.js] Create Route Post Err", e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});
// Exporting our http function
exports.createCheckOutSession = functions.https.onRequest(
  createCheckOutSessionApp
);

//complete the checkout session

const endpointSecret = "whsec_AkznONtHYPMXG0QSeBjyxHFx8zXzXfcc";

const processCheckOutApp = express();

processCheckOutApp.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    functions.logger.log(
      "[Firebase Function] processCheckoutApp rq res",
      request,
      response
    );

    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret
      );
    } catch (err) {
      functions.logger.log(
        "[Firebase Function] stripe webhooks constructEvent Err",
        err
      );
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Here we can proccess the order data after successfull payment
      // (e.g. change payment status in Firebase Database and call another function)
    }
    // Return a response to acknowledge receipt of the event
    return response.json({ received: true });
  }
);
// Exporting our http function
exports.processCheckOut = functions.https.onRequest(processCheckOutApp);
