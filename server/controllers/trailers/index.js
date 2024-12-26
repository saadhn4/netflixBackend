import express from "express";
import trailerModel from "../../models/Trailers/Trailers.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    let trailerData = req.body;
    console.log(trailerData);
    await trailerModel.create(trailerData);
    res.status(200).json({ msg: "Trailer added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let trailer = await trailerModel.findOne({ _id: userParams });
    res.status(200).json({ trailer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let alltrailers = await trailerModel.find({});
    res.status(200).json({ alltrailers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userUpdate = req.body;
    await trailerModel.updateOne({ _id: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "Trailer info updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await trailerModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Trailer deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await trailerModel.deleteMany({});
    res.status(200).json({ msg: "Deleted all trailers" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
