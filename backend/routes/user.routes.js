const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");

const userRouter = express.Router();

//REGISTER
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  const exuser = await UserModel.findOne({ email });
  if (exuser)
    res.status(400).send({ message: "User already exist, please login" });
  else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(200).send({ message: err.message });
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
            is_married,
          });
          await user.save();
          res.status(200).send({ message: "user registered", user: user });
        }
      });
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  }
});

//LOGIN
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, async (err, result) => {
      if(result){
        const token = jwt.sign({name: user.name, userId: user._id },"masai")
        res.status(200).send({ message: "Login Successfull","token":token });
      }
      else{
        res.status(200).send({ message: "Wrong Credentials" });
      }
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

userRouter.get("/logout",(req,res)=>{
  const token = req.headers.authorization?.split(" ")[1]
  try{
    blacklist.push(token)
    res.status(200).send({ message: "Logout Sucessfully" });
  }
  catch (err) {
    res.status(400).send({ err: err.message });
  }
})

module.exports = { userRouter };
