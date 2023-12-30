// const express = require("express");
// const app = express();
// const port = 5000;
// const mongoose = require("mongoose");
// let dotenv = require("dotenv").config();
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const MONGO_URI = `mongodb+srv://tanzimnahid6:ztMxsHPYo5WXhae2@cluster0.bezdwcv.mongodb.net/authApp?retryWrites=true&w=majority`;
// //connect mongodb through mongoose======start
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
// //connect mongodb through mongoose======end

// const User = require("./model/userModel");
// app.get("/", (req, res) => {
//   res.status(200).json({
//     "message": "Connect to the auth server"
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port  ${port}`);
// });

// //get all users============================
// app.get("/users", async (req, res) => {
//   const users = await User.find({});
//   res.send(users);
// });
// //user sign up =================
// app.post("/signUp", async (req, res) => {
//   try {
//     const newUser = {
//       username: req.body.username,
//       email: req.body.email,
//       password: await bcrypt.hash(req.body.password, saltRounds),
//     };
//     const postedUser = await User.create(newUser);
//     res.send(postedUser);
//   } catch (error) {
//     res.send("Faild to sign up");
//   }
// });

// app.get("/login",async (req,res)=>{
//   res.send("Auth failed")
// })

// // //user login handler============
// app.post("/login", async (req, res) => {
//   try {
//     const user = await User.find({ username: req.body.username });
//     if (user && user.length > 0) {
//       const isValidPassword = await bcrypt.compare(
//         req.body.password,
//         user[0].password
//       );
//       if (isValidPassword) {
//         const user = {
//           username: user[0].username,
//           id: user[0]._id,
//         };
//         const token = jwt.sign(user, process.env.JWT_SECRET, {
//           expiresIn: "8h",
//         });
//         res.status(200).json({
//           "access_token": token,
//           "message": "Login successfull",
//         });
//       } else {
//         res.status(401).json({
//           "error": "Authentication failed",
//         });
//       }
//     } else {
//       res.status(401).json({
//         "error": "Authentication failed",
//       });
//     }
//   } catch (error) {
//     res.status(401).json({
//       "error": "Authentication faile",
//     });
//   }
// });


