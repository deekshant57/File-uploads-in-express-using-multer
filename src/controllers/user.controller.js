const express = require("express");
const User = require("../models/user.model");

const uploads = require("../middlewares/upload");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find({}).lean().exec();
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ mesage: error.message });
  }
});

router.post("/", uploads.single("profile_pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      profile_pic: req.file.path,
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ mesage: error.message });
  }
});

router.patch("/:id", uploads.single("profile_pic"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      profile_pic: req.file.path,
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
