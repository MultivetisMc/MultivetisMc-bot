const mysql = require(`mysql2/promise`);
const databaseConfig = require("../Config/DBConfig.json")

const pool = mysql.createPool(databaseConfig);

async function executeQuery(query) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(query);
        await connection.release();
        return rows;
    } catch (error) {
        console.error(error);
        return error;
    }
}

module.exports = { executeQuery };