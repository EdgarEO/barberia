const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

conexion.connect((err) => {
    if (err) {
        console.log('Error de conexión:', err);
    } else {
        console.log('MySQL conectado correctamente');
    }
});

module.exports = conexion;
