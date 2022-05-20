const express = require("express");
const router = express.Router();
const {body} = require('express-validator/check')

// importamos el controlador
const projectController = require("../controllers/projectController");
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

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

  // Eliminar Proyecto
  router.delete('/proyectos/:url/:id', projectController.eliminarProyecto);

  // Tareas
  router.post('/proyectos/:url', tareasController.agregarTarea);

  // Actualizar Tarea
  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

  // Eliminar Tarea
  router.delete('/tareas/:id', tareasController.eliminarTarea);

  // Crear Nueva Cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);


  return router;
};
