const client = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

await client.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, hashedPassword]
);

        res.json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "you have already registered"
        });
    }
};
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const result = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.json({
                message: "User Not Found"
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
    password,
    user.password
);

if (!isMatch) {

    return res.json({
        message: "Invalid Password"
    });

}

       const token = jwt.sign(
    {
        id: user.id,
        email: user.email
    },
    "mysecretkey",
    {
        expiresIn: "1d"
    }
);

res.json({

    message: "Login Successful",

    token: token,

    id: user.id,

    name: user.name,

    email: user.email

});

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Login Failed"
        });
    }
};
module.exports = {
    registerUser,loginUser
};