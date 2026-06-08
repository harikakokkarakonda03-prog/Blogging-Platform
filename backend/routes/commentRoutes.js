const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    addComment,
    getComments
} = require("../controllers/commentController");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    addComment
);

router.get("/:postId", getComments);

module.exports = router;