const mySQL = require('mysql2');

const db = mySQL.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'JosephineHound16',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

module.exports = db;