const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserRouter = express.Router();

// Model Location
const { UserModel } = require("../Models/UserModel");

// Sign Up

UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const data = await UserModel.find({ email });

    if (data.length > 0) {
      res.status(401).send({
        Message: "User Already Registered",
      });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) res.status(401).send({ Message: "Contact to administrator" });
        else {
          const savedata = new UserModel({
            name,
            email,
            password: hash,
            role,
          });
          await savedata.save();
          res.status(200).send({
            Message: "Registered Successfully",
          });
        }
      });
    }
  } catch (error) {
    console.log(`Error in Signup: ${error.message}`);
    res.send({
      Message: `Error in Signup : ${error.message}`,
    });
  }
});

// Login

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await UserModel.findOne({ email });

    if (!data) {
      res.status(404).send({
        Message: "User not found",
      });
    }

    const hashedpass = data?.password;

    bcrypt.compare(hashedpass, password, async (err, result) => {
      if (err) res.status(404).send({ Message: "Contact to administrator" });
      else {
        const Normaltoken = jwt.sign(
          {
            UserRole: data.role,
          },
          process.env.NORMAL_KEY,
          {
            expiresIn: 600,
          }
        );

        const Refreshtoken = jwt.sign(
          {
            UserRole: data.role,
          },
          process.env.REFRESH_KEY,
          {
            expiresIn: 600,
          }
        );

        res.cookie("NormalToken", Normaltoken, { httpOnly: true });
        res.cookie("RefreshToken", Refreshtoken, { httpOnly: true });

        res.status(200).send({
          Message: "Login successfully",
          Normal_Token: Normaltoken,
          Refresh_Token: Refreshtoken,
        });
      }
    });
  } catch (error) {
    console.log(`Error in Login: ${error.message}`);
    res.send({
      Message: `Error in Login : ${error.message}`,
    });
  }
});

module.exports = { UserRouter };
