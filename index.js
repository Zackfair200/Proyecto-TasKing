const express = require("express");
const routes = require("./routes/index");
const path = require("path");
const bodyParser = require('body-parser')

// Crear una aplicacion de express
const app = express();

// Donde cargar los archivos estáticos
app.use(express.static("public"));

// Habilitamos el template engine 'Pug'
app.set("view engine", "pug");

// Añadimos la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));

// Habilitamos el "bodyParser" para poder leer los datos del formulario
app.use(bodyParser.urlencoded({ extended:true }));

app.use("/", routes());

app.listen(3000);
