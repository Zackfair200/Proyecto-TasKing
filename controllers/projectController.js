const express = require("express");
const { response, request } = require("express");
const res = require("express/lib/response");
const Proyectos = require("../models/Proyectos");

exports.projectHome = async (request, response) => {
  const proyectos = await Proyectos.findAll();

  response.render("index", {
    nombrePagina: "Proyectos ",
    proyectos,
  });
};

exports.formularioProyecto = async (request, response) => {
  const proyectos = await Proyectos.findAll();
  response.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (request, response) => {
  const proyectos = await Proyectos.findAll();
  const { nombre } = request.body;
  let errores = [];
  if (!nombre) {
    errores.push({ texto: "Agrega un Nombre al Proyecto" });
  }

  if (errores.length > 0) {
    response.render("NuevoProyecto", {
      nombre,
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    await Proyectos.create({ nombre });
    response.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url
    }
  });
  const [proyectos,proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  if (!proyecto) return next();

  res.render("tareas", {
    nombrePagina: "Tareas del Proyecto",
    proyecto,
    proyectos,
  });
};

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id
    }
  });
  const [proyectos,proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto
  });
};

exports.actualizarProyecto = async (request, response) => {
  const proyectos = await Proyectos.findAll();
  const { nombre } = request.body;
  let errores = [];
  if (!nombre) {
    errores.push({ texto: "Agrega un Nombre al Proyecto" });
  }

  if (errores.length > 0) {
    response.render("NuevoProyecto", {
      nombre,
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: request.params.id}}
    );
    response.redirect("/");
  }
};