const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();


const client = require("./config/database");


const createUsersTable = require("./models/User");
const createCommentsTable = require("./models/Comment");
const createPostsTable = require("./models/Post");


const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");


const app = express();


app.use(cors());

app.use(express.json());


// API

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);


// Frontend files

app.use(
    express.static(
        path.join(__dirname,"../frontend")
    )
);


// Home page

app.get("/",(req,res)=>{

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/register.html"
        )
    );

});


// Database

client.connect()
.then(async()=>{

console.log(
"PostgreSQL Connected Successfully"
);


await createUsersTable();

await createPostsTable();

await createCommentsTable();


})
.catch(err=>{

console.log(
"Database Connection Failed"
);

console.log(err.message);

});



// Local only

if(process.env.NODE_ENV !== "production"){

app.listen(
process.env.PORT || 5000,
()=>{

console.log(
"Server Running"
);

});

}



module.exports = app;