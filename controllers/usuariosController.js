const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en TasKing'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en TasKing',
        error: error
    })
}

exports.crearCuenta = async (req, res) => {
    // Leemos los datos
    const {email, password} = req.body;

    try {
        // Creamos el usuario
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta en TasKing',
            email: email,
            password: password
        })
    }
}

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}