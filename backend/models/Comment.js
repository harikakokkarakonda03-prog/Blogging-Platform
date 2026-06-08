const client = require("../config/database");

const createCommentsTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,

            post_id INTEGER REFERENCES posts(id),

            user_id INTEGER REFERENCES users(id),

            comment TEXT NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await client.query(query);

    console.log("Comments Table Ready");
};

module.exports = createCommentsTable;