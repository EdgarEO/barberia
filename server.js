const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());


// =====================
// INICIO
// =====================

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});


// =====================
// REGISTRO
// =====================

app.post('/registro', (req, res) => {

    const { nombre, correo, password } = req.body;

    const sql = `
    INSERT INTO usuarios(nombre, correo, password)
    VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [nombre, correo, password],
        (err, result) => {

            if(err){
                console.log(err);

                return res.status(500).json({
                    mensaje:'Error al registrar'
                });
            }

            res.json({
                mensaje:'Usuario registrado'
            });

        }
    );

});


// =====================
// LOGIN
// =====================

app.post('/login', (req, res) => {

    const { correo, password } = req.body;

    const sql = `
    SELECT * FROM usuarios
    WHERE correo = ?
    AND password = ?
    `;

    db.query(
        sql,
        [correo, password],
        (err, results) => {

            if(err){

                return res.status(500).json({
                    mensaje:'Error en servidor'
                });

            }

            if(results.length > 0){

                res.json({
                    success:true,
                    usuario:results[0]
                });

            }else{

                res.json({
                    success:false,
                    mensaje:'Correo o contraseña incorrectos'
                });

            }

        }
    );

});


// =====================
// AGENDAR CITA
// =====================

app.post('/cita', (req, res) => {

    const {
        usuario_id,
        nombre,
        telefono,
        servicio,
        fecha,
        hora
    } = req.body;

    let precio = 0;

    if(servicio === 'Corte'){
        precio = 150;
    }

    if(servicio === 'Barba'){
        precio = 100;
    }

    if(servicio === 'Corte y Barba'){
        precio = 250;
    }

    const verificar = `
    SELECT * FROM citas
    WHERE fecha = ?
    AND hora = ?
    `;

    db.query(
        verificar,
        [fecha, hora],
        (err, resultado) => {

            if(err){

                return res.status(500).json({
                    mensaje:'Error al verificar horario'
                });

            }

            if(resultado.length > 0){

                return res.json({
                    success:false,
                    mensaje:'Ese horario ya está reservado'
                });

            }

            const sql = `
            INSERT INTO citas
            (
                usuario_id,
                nombre,
                telefono,
                servicio,
                fecha,
                hora,
                precio
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
                sql,
                [
                    usuario_id,
                    nombre,
                    telefono,
                    servicio,
                    fecha,
                    hora,
                    precio
                ],
                (err, result) => {

                    if(err){

                        console.log(err);

                        return res.status(500).json({
                            mensaje:'Error al guardar cita'
                        });

                    }

                    res.json({
                        success:true,
                        mensaje:'Cita registrada correctamente'
                    });

                }
            );

        }
    );

});


// =====================
// ESTADISTICAS
// =====================

app.get('/estadisticas', (req, res) => {

    const sql = `
    SELECT
        COUNT(*) AS totalClientes,
        SUM(precio) AS ingresos
    FROM citas
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result[0]);

    });

});


// =====================
// LISTAR CITAS
// =====================

app.get('/citas', (req, res) => {

    const sql = `
    SELECT * FROM citas
    ORDER BY fecha DESC
    `;

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


// =====================
// SERVIDOR
// =====================

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});