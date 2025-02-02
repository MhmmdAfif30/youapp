const express = require("express");
const router = express.Router();

const { createProfile } = require("../controllers/aboutControllers")
const { image } = require("../libs/multer")


router.post("/upload", image.single("image"), createProfile);


module.exports = router;
