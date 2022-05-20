const express = require("express");
const routes = require("./routes/index");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require('connect-flash');

// Importamos helpers (importamos nuestras funciones)
const helpers = require("./helpers");

// Crear conexion a la BBDD
const db = require("./config/db");

// Importar el modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

db.sync()
  .then(() => console.log("Conectado al servidor!"))
  .catch((error) => console.log(error));

// Crear una aplicacion de express
const app = express();

// Habilitamos el "bodyParser" para poder leer los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Donde cargar los archivos estáticos
app.use(express.static("public"));

// Habilitamos el template engine 'Pug'
app.set("view engine", "pug");

// Añadimos la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));

// Agregar flash messages
app.use(flash());

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
  res.locals.year = 2022;
  res.locals.vardump = helpers.vardump;
  next();
});


app.use("/", routes());

app.listen(3000);
