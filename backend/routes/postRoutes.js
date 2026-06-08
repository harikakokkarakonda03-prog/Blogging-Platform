const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    createPost,
    getPosts,
    getUserPosts,
    getOtherPosts,
    deletePost,
    updatePost
} = require("../controllers/postController");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createPost
);
router.get("/", getPosts);
router.get("/user/:userId", getUserPosts);
router.get("/others/:userId", getOtherPosts);
router.delete(
    "/:id",
    authMiddleware,
    deletePost
);
router.put(
    "/:id",
    authMiddleware,
    updatePost
);
module.exports = router;