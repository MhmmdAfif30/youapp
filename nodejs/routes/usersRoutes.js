const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/usersControllers");
const { restrict } = require("../middlewares/usersMiddlewares")

router.post("/register", register);
router.post("/login", login);
router.get("/getProfile", restrict, (req, res) => {
    res.json({ status: true, message: "Users profile", user: req.user });
});

module.exports = router;
