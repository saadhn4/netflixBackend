import express from "express";
import adminModel from "../../models/Admins/Admins.js";

const router = express.Router();

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let admin = await adminModel.findOne({ _id: userParams });
    res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let allAdmins = await adminModel.find({});
    res.status(200).json({ allAdmins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userUpdate = req.body;
    await adminModel.updateOne({ _id: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "Admin info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await adminModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Admin deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await adminModel.deleteMany({});
    res.status(200).json({ msg: "Deleted all admins" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
