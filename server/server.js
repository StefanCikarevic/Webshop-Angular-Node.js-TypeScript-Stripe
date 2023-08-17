const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

const stripe = require("stripe")(
  "sk_test_51Ng6H5BeYWt8epzE0NNN4w1iSGLe1NWVrNihNi6ggEdJfh0vo0v32d1apmtKqOJ6aPDyQQuja067rvI49OINZc9m00TvEwSQni"
);

app.post("/checkout", async (req, res, next) => {
  console.log("Checkout route reached");
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:59135/success.html",
      cancel_url: "http://localhost:59135/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.listen(59135, () => console.log("app is running on 59135"));
