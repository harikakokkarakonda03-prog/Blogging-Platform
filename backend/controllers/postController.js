const client = require("../config/database");

const createPost = async (req, res) => {

    const { userId,title, content } = req.body;

    try {

        await client.query(
    "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)",
    [userId, title, content]
);

        res.json({
            message: "Post Created Successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Create Post"
        });
    }
};
const getPosts = async (req, res) => {

    try {

        const result = await client.query(
    `
    SELECT posts.*, users.name
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    ORDER BY posts.id DESC
    `
);
        res.json(result.rows);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Fetch Posts"
        });
    }
};
const getUserPosts = async (req, res) => {

    console.log("NEW CODE RUNNING");

    const { userId } = req.params;

    try {

       const result = await client.query(
    `
    SELECT posts.*, users.name
    FROM posts
    JOIN users
    ON posts.user_id = users.id
    WHERE user_id = $1
    ORDER BY posts.id DESC
    `,
    [userId]
);
        res.json(result.rows);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Fetch User Posts"
        });
    }
};
const getOtherPosts = async (req, res) => {

    const { userId } = req.params;

    try {

        const result = await client.query(
            `
            SELECT posts.*, users.name
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            WHERE posts.user_id != $1
            ORDER BY posts.id DESC
            `,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Fetch Other Posts"
        });
    }
};
const deletePost = async (req, res) => {
console.log("Deleting Post ID:", req.params.id);
    const { id } = req.params;
    const loggedInUserId = req.user.id;

    try {
const postResult = await client.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
);

if (postResult.rows.length === 0) {
    return res.status(404).json({
        message: "Post Not Found"
    });
}

if (postResult.rows[0].user_id !== loggedInUserId) {
    return res.status(403).json({
        message: "Access Denied"
    });
}
        await client.query(
    "DELETE FROM comments WHERE post_id = $1",
    [id]
);

await client.query(
    "DELETE FROM posts WHERE id = $1",
    [id]
);

        res.json({
            message: "Post Deleted Successfully"
        });

    } catch (error) {

    console.log("DELETE ERROR:");
    console.log(error);

    res.status(500).json({
        message: "Failed To Delete Post"
    });
}
};
const updatePost = async (req, res) => {

   const { id } = req.params;

const { title, content } = req.body;

const loggedInUserId = req.user.id;

    try {
const postResult = await client.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
);

if (postResult.rows.length === 0) {

    return res.status(404).json({
        message: "Post Not Found"
    });

}

if (postResult.rows[0].user_id !== loggedInUserId) {

    return res.status(403).json({
        message: "Access Denied"
    });

}
        await client.query(
            "UPDATE posts SET title = $1, content = $2 WHERE id = $3",
            [title, content, id]
        );

        res.json({
            message: "Post Updated Successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Update Post"
        });
    }
};
module.exports = {
    createPost,
    getPosts,
    getUserPosts,
    getOtherPosts,
    deletePost,
    updatePost
};