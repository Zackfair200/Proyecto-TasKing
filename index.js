const express = require("express");
const routes = require("./routes/index");
const path = require("path");

// Crear una aplicacion de express
const app = express();

// Donde cargar los archivos estáticos
app.use(express.static("public"));

// Habilitamos el template engine 'Pug'
app.set("view engine", "pug");

// Añadimos la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));

app.use("/", routes());

app.listen(3000);
