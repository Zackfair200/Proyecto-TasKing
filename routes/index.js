const { request, response } = require("express");
const express = require("express");
const router = express.Router();

// importamos el controlador
const projectController = require("../controllers/projectController");

module.exports = function () {
  // Ruta para el home
  router.get("/", projectController.projectHome);
  return router;
};
