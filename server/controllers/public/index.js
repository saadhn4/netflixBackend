import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import userModel from "../../models/Users/Users.js";
import adminModel from "../../models/Admins/Admins.js";

const router = express.Router();

router.post("/registeruser", async (req, res) => {
  try {
    let userData = req.body;
    let userEmail = userData.email;
    //hashing
    let hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    //checking if user already exists or not
    let checkDuplicate = await userModel.findOne({ email: userEmail });
    if (checkDuplicate) {
      return res.status(400).json({ msg: "User already exists!" });
    }
    //jwt
    let secretKey = config.get("SECRET_KEY");
    let sendToken = jwt.sign({ checkDuplicate }, secretKey, {
      expiresIn: "1h",
    });
    await userModel.create(userData);
    res
      .status(201)
      .json({ msg: "User succesfully registered! 💻", token: sendToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/loginuser", async (req, res) => {
  try {
    let userData = req.body;
    let userEmail = userData.email;
    let userPass = userData.password;
    let checkUser = await userModel.findOne({ email: userEmail });
    if (!checkUser) {
      return res
        .status(400)
        .json({ msg: "User doesnt exist! Please register" });
    }
    let hashPash = checkUser.password;
    let checkPass = await bcrypt.compare(userPass, hashPash);
    if (checkPass) {
      res.status(200).json({ msg: "Logged in succesfully!" });
    } else {
      res.status(400).json({ msg: "Invalid credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

//api to register admin

//check for duplicate, hash, jwt

router.post("/registeradmin", async (req, res) => {
  try {
    let adminData = req.body;
    let adminEmail = adminData.email;
    // let adminPass = adminData.password;
    //check for duplicates first
    let checkDuplicate = await adminModel.findOne({ email: adminEmail });
    if (checkDuplicate) {
      return res.status(400).json({ msg: "Admin already exists!!!" });
    }
    let hash = await bcrypt.hash(adminData.password, 10);
    adminData.password = hash;
    //jwt
    let secretKey = config.get("SECRET_KEY");
    let sendToken = jwt.sign({ checkDuplicate }, secretKey, {
      expiresIn: "1h",
    });
    await adminModel.create(adminData);
    res.status(200).json({ msg: "Admin registered!", token: sendToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/loginadmin", async (req, res) => {
  try {
    let adminData = req.body;
    let adminEmail = adminData.email;
    let adminPass = adminData.password;
    let checkAdmin = await adminModel.findOne({ email: adminEmail });
    if (!checkAdmin) {
      return res.status(400).json({ msg: "Admin does not exist!" });
    }
    let hashPass = checkAdmin.password;
    let checkPass = await bcrypt.compare(adminPass, hashPass);
    if (checkPass) {
      return res.status(200).json({ msg: "Admin logged in succesfully." });
    } else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
