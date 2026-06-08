const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        message: "Auth Route Working"
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;