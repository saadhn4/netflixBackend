import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../../models/Users/Users.js";

const router = express.Router();

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let user = await userModel.findOne({ _id: userParams });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let allUsers = await userModel.find({});
    res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userUpdate = req.body;
    await userModel.updateOne({ _id: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "User info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await userModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "Deleted all users" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
