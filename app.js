// =========================
// REGISTRO DE USUARIO
// =========================

async function registrarUsuario(){

const nombre =
document.getElementById("nombreUsuario").value;

const correo =
document.getElementById("correoUsuario").value;

const password =
document.getElementById("passwordUsuario").value;

if(
nombre === "" ||
correo === "" ||
password === ""
){
alert("Completa todos los campos");
return;
}

const respuesta = await fetch(
'http://localhost:3000/registro',
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
nombre,
correo,
password
})
}
);

const datos = await respuesta.json();

alert(datos.mensaje);

window.location.href='index.html';

}
// =========================
// LOGIN
// =========================

async function login(){

const correo =
document.getElementById("correo").value;

const password =
document.getElementById("password").value;

const respuesta = await fetch(
'http://localhost:3000/login',
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
correo,
password
})
}
);

const datos = await respuesta.json();

if(datos.success){

localStorage.setItem(
'usuario_id',
datos.usuario.id
);

localStorage.setItem(
'usuario_nombre',
datos.usuario.nombre
);

window.location.href =
"inicio.html";

}else{

alert(datos.mensaje);

}

}

// =========================
// AGENDAR CITA
// =========================

async function agendar(){

const usuario_id =
localStorage.getItem('usuario_id');

const nombre =
document.getElementById("nombre").value;

const telefono =
document.getElementById("telefono").value;

const servicio =
document.getElementById("servicio").value;

const fecha =
document.getElementById("fecha").value;

const hora =
document.getElementById("hora").value;

if(
nombre === "" ||
telefono === "" ||
servicio === "" ||
fecha === "" ||
hora === ""
){
alert("Completa todos los campos");
return;
}

const respuesta = await fetch(
'http://localhost:3000/cita',
{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify({
usuario_id,
nombre,
telefono,
servicio,
fecha,
hora
})
}
);

const datos = await respuesta.json();

if(datos.success){

alert(datos.mensaje);

window.location.href =
'confirmacion.html';

}else{

alert(datos.mensaje);

}
}