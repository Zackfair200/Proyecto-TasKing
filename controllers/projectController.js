const express = require("express");
const { response, request } = require("express");
const res = require("express/lib/response");

exports.projectHome = (request, response) => {
  response.render("index", {
    nombrePagina: "Proyectos",
  });
};

exports.formularioProyecto = (request, response) => {
  response.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

exports.nuevoProyecto = (request, response) => {
  const { nombre } = request.body;
  let errores = [];
  if (!nombre) {
    errores.push({ texto: "Agrega un Nombre al Proyecto" });
  }
  
  response.render("NuevoProyecto", {
    nombre,
    nombrePagina: "Nuevo Proyecto",
    errores,
  });
};
