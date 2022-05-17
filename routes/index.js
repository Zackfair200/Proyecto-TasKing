const express = require("express");
const router = express.Router();
const {body} = require('express-validator/check')

// importamos el controlador
const projectController = require("../controllers/projectController");

module.exports = function () {
  // Ruta para el home
  router.get("/", projectController.projectHome);
  router.get("/nuevo-proyecto", projectController.formularioProyecto);
  router.post("/nuevo-proyecto",
  body('nombre').not().isEmpty().trim().escape(),
  projectController.nuevoProyecto
  );

  // Listar Proyecto
  router.get('/proyectos/:url', projectController.proyectoPorUrl)
  return router;
};
