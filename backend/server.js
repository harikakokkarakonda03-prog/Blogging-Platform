const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const client = require("./config/database");

// This is the missing import
const createUsersTable = require("./models/User");
const createCommentsTable = require("./models/Comment");
const createPostsTable = require("./models/Post");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);
client.connect()
    .then(async () => {
        console.log("PostgreSQL Connected Successfully");

        // This is the missing function call
        await createUsersTable();
       
        await createPostsTable();
         await createCommentsTable();
    })
    .catch((error) => {
        console.log("Database Connection Failed");
        console.log(error.message);
    });






const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV !== "production") {

    app.listen(PORT,()=>{

        console.log(
            `Server running on port ${PORT}`
        );

    });

}
app.get("/", (req,res)=>{

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/register.html"
        )
    );

});

module.exports = app;