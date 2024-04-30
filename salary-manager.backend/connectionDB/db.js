const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "salary_manager"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connection reussie!");
});

module.exports = conn;