const express = require("express");
const router = express.Router();
const {body} = require('express-validator')

// importamos el controlador
const projectController = require("../controllers/projectController");
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function () {
  // Ruta para el home
  router.get("/",
  authController.usuarioAutenticado,
  projectController.projectHome
  );

  router.get("/nuevo-proyecto",
  authController.usuarioAutenticado,
  projectController.formularioProyecto
  );

  router.post("/nuevo-proyecto",
  authController.usuarioAutenticado,
  body('nombre').not().isEmpty().trim().escape(),
  projectController.nuevoProyecto
  );

  // Listar Proyecto
  router.get('/proyectos/:url',
  authController.usuarioAutenticado,
  projectController.proyectoPorUrl
  );

  // Actualizar el Proyecto
  router.get("/proyecto/editar/:id",
  authController.usuarioAutenticado,
  projectController.formularioEditar
  );

  router.post("/nuevo-proyecto/:id",
  authController.usuarioAutenticado,
  body('nombre').not().isEmpty().trim().escape(),
  projectController.actualizarProyecto
  );

  // Eliminar Proyecto
  router.delete('/proyectos/:url/:id',
  authController.usuarioAutenticado,
  projectController.eliminarProyecto
  );

  // Tareas
  router.post('/proyectos/:url',
  authController.usuarioAutenticado,
  tareasController.agregarTarea
  );

  // Actualizar Tarea
  router.patch('/tareas/:id',
  authController.usuarioAutenticado,
  tareasController.cambiarEstadoTarea
  );

  // Eliminar Tarea
  router.delete('/tareas/:id',
  authController.usuarioAutenticado,
  tareasController.eliminarTarea
  );

  // Crear Nueva Cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);
  router.get('/confirmar/:correo', usuariosController.confirmarCuenta);

  // Iniciar sesion
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
  router.post('/iniciar-sesion', authController.autenticarUsuario);

  // Cerrar sesion
  router.get('/cerrar-sesion', authController.cerrarSesion);

  // Restablecer contraseña
  router.get('/reestablecer', usuariosController.formRestablecerPassword);
  router.post('/reestablecer', authController.enviarToken);
  router.get('/reestablecer/:token', authController.validarToken);
  router.post('/reestablecer/:token', authController.actualizarPassword);


  return router;
};
