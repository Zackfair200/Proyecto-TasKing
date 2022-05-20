const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en TasKing'
    })
}

exports.crearCuenta = (req, res) => {
    // Leemos los datos
    const {email, password} = req.body;

    // Creamos el usuario
    Usuarios.create({
        email,
        password
    })
    .then(() => {
        res.redirect('/iniciar-sesion')
    })
}