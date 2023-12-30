const express = require("express");
const app = express();
const port = 5000;
let dotenv = require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bezdwcv.mongodb.net/authApp?retryWrites=true&w=majority`;
//connect mongodb through mongoose======start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// connect mongodb through mongoose======end
const User = require("./model/userModel");
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Connect to the auth server",
  });
});
app.listen(port, () => {
  console.log(`Server is listening on port  ${port}`);
});

//===========================
app.get("/users", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
//user sign up =================
app.post("/signUp", async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds),
    };
    const postedUser = await User.create(newUser);
    res.send(postedUser);
  } catch (error) {
    res.send("Faild to sign up");
  }
});

//handle login user=============

app.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const validUser = {
          username: user[0].username,
          email: user[0].email,
          id: user[0]._id,
        };
        const token = jwt.sign(validUser, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });

        res.send({
          acccess_token: token,
          message: "Login successfull",
        });
      } else {
        res.send("Login faild to bcz invalid user");
      }
    }
  } catch (error) {
    res.send("Auth faild in catch block");
  }
});
