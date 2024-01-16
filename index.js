/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });




const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OQD4iFealxv0C5fpCqKJ8M1TgBUtrImhvfjZC31ywXOOLb3EjMZExSyAzOMMZLNgSabkHTXk7lpLUW2dZWmYkE700XQYYPmzW");

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/order/create", async (request, response) => {
  const { total } = request.body;
  console.log("Payment request received for this amount >>>", total);

  try {
    const totalAmount = parseInt(total, 10);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });

    console.log("Payment Intent created successfully:", paymentIntent.client_secret);

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    response.status(500).send({
      error: "Unable to create payment intent",
      details: error.stack,
    });
  }
});

app.listen(port, () => 
console.log('hello', port)
);

// exports.api = functions.https.onRequest(app);




