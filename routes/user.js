const express = require("express");
require('dotenv').config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  console.log("req", req.body);
  const { name, email, password, mobile, address } = req.body;

  if (!(email && password && mobile)) {
    res.status(400).send("Input fields are required!");
  }
  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.status(409).send("User Already Exist, please Login!");
  }

  // Create and save user
  const signedUser = await User.create({
    name,
    email,
    password,
    address,
    mobile,
  });

  console.log(signedUser);
  if (signedUser) {
    // Create Token
    const token = jwt.sign(
      {
        _id: signedUser._id,
      },
      process.env.TOKEN_KEY, // TOKEN_KEY or SECRET_KEY
      {
        expiresIn: "30d",
      }
    );

    signedUser.token = token;
    console.log(token);
    res.send(signedUser);
  } else {
    res.send("Something went wrong!");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("Input fields are required!");
  }

  const query = { email, password };
  //  Validate if user exists or not
  const loginUser = await User.findOne(query);

  if (loginUser) {
    // Create Token
    console.log("secret key: ", process.env.TOKEN_KEY)
    const token = jwt.sign({ _id: loginUser._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    console.log(token);
    loginUser.token = token;
    res.send(loginUser);
  } else {
    res.send("Email or Password is incorrect!");
  }
});

router.get("/", async (req, res)=>{
  const users = await User.find()
  res.json({users})
})

// Random API to check authentication
router.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = router;
