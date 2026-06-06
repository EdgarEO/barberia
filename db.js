const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Edgaromar17',
    database: 'barberia'
});

conexion.connect((err) => {
    if(err){
        console.log('Error de conexión:', err);
    }else{
        console.log('MySQL conectado');
    }
});

module.exports = conexion;
