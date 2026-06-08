const client = require("../config/database");

const addComment = async (req, res) => {

    const { postId, userId, comment } = req.body;

    try {

        await client.query(
            "INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3)",
            [postId, userId, comment]
        );

        res.json({
            message: "Comment Added Successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Add Comment"
        });
    }
};

const getComments = async (req, res) => {

    const { postId } = req.params;

    try {

        const result = await client.query(
            `
            SELECT comments.*, users.name
            FROM comments
            JOIN users
            ON comments.user_id = users.id
            WHERE post_id = $1
            ORDER BY comments.id DESC
            `,
            [postId]
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Failed To Fetch Comments"
        });
    }
};
console.log(addComment);
console.log(getComments);
module.exports = {
    addComment,
    getComments
};