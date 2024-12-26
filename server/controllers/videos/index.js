import express from "express";
import videoModel from "../../models/Videos/Videos.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let videoData = req.body;
    console.log(videoData);
    await videoModel.create(videoData);
    res.status(200).json({ msg: "Video added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let video = await videoModel.findOne({ _id: userParams });
    res.status(200).json({ video });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let allVideos = await videoModel.find({});
    res.status(200).json({ allVideos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userUpdate = req.body;
    await videoModel.updateOne({ _id: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "Video info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await videoModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Video deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await videoModel.deleteMany({});
    res.status(200).json({ msg: "Deleted all Videos" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
