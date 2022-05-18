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
  router.get('/proyectos/:url', projectController.proyectoPorUrl);

  // Actualizar el Proyecto
  router.get("/proyecto/editar/:id", projectController.formularioEditar);
  router.post("/nuevo-proyecto/:id",
    body('nombre').not().isEmpty().trim().escape(),
    projectController.actualizarProyecto
  );

  return router;
};
