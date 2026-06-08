const client = require("../config/database");

const createPostsTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await client.query(query);

    console.log("Posts Table Ready");
};

module.exports = createPostsTable;