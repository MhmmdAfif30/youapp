const express = require("express");
const router = express.Router();

const { createProfile, updateProfile } = require("../controllers/aboutControllers")
const { image } = require("../libs/multer")


router.post("/upload", image.single("image"), createProfile);
router.put("/update", image.single("image"), updateProfile);


module.exports = router;
