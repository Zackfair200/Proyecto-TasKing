const Sequelize = require("sequelize");
const db = require("../config/db");
const slug = require("slug");
const shortid = require('shortid')

const Proyectos = db.define("proyectos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING(100),
  },
  url: {
    type: Sequelize.STRING(100),
  },
  usuarioId: {
    type: Sequelize.INTEGER,
  }
}, {
  hooks:{
      // Antes de insertar en la base de datos, traemos el objeto con la información del proyecto (nombre y url)
    beforeCreate(proyecto){
      // La variable 'URL' almacena: El nombre del proyecto concatenado con '-' (gracias a slug()) y en minusculas (gracias a toLowerCase())
      const url = slug(proyecto.nombre).toLowerCase();
      // Modificamos el valor URL del objeto que nos hemos traido al principio (proyecto.url), por un template string con el valor de la variable de antes (URL) + un id (generado con shortid.generate())
      proyecto.url = `${url}-${shortid.generate()}`

    }
  }
});

module.exports = Proyectos;
