const express = require("express");
const Gallery = require("../models/gallery.model");

const uploads = require("../middlewares/upload");

const router = express.Router();

router.post("/", uploads.any("profile_pic"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });
    const gallery = await Gallery.create({
      first_name: req.body.first_name,
      profile_pic: filePaths,
    });
    return res.status(201).send(gallery);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const gallery = await Gallery.find({}).lean().exec();
    return res.status(200).send(gallery);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
