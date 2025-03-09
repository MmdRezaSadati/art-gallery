// This controller now uses Stripe for test payments instead of Paytm.
// It creates a PaymentIntent in Stripe's test mode.
const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const Payment = require("../models/paymentModel");
const ErrorHandler = require("../utils/errorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use your Stripe test secret key
const { v4: uuidv4 } = require("uuid");

// Process Payment using Stripe PaymentIntent
exports.processPayment = asyncErrorHandler(async (req, res, next) => {
  const { amount, currency = "usd", receipt_email } = req.body;
  
  // Create a PaymentIntent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // amount in cents
    currency,
    receipt_email,
    metadata: { integration_check: "accept_a_payment", orderId: uuidv4() },
  });
  
  // Respond with client secret for front-end usage
  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

// Confirm Payment (for webhook or manual confirmation, simplified here)
exports.confirmPayment = asyncErrorHandler(async (req, res, next) => {
  // For test mode, assume payment is confirmed successfully.
  res.status(200).json({
    success: true,
    message: "Payment confirmed successfully.",
  });
});
