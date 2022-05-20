const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt-nodejs');



const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un Correo Válido'
            },
            notEmpty: {
                msg: 'El email es obligatorio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password es obligatorio'
            }
        }
    }
},{
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10) );

        }
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;