const client = require("../config/database");

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;                                   

    await client.query(query);
    console.log("Users Table Ready");
};

module.exports = createUsersTable;