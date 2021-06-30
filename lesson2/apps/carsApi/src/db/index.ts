import mysql from "mysql2/promise"

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'northwind'
});

function getConnection() {
    return pool;
}

export { getConnection }