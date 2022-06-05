const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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
        
        // Confirmacion
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        const usuario = {
            email
        }

        await enviarEmail.enviar({
            usuario,
            subject: 'Confirmación de Correo',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        req.flash('correcto', 'Se ha enviado un correo de confirmación');
        res.redirect('/iniciar-sesion');

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

// Cambia el estado de confirmado de 0 a 1 si confirma
exports.confirmarCuenta = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });

    if(!usuario){
        req.flash('error','No valido');
        res.redirect('/crear-cuenta');
    }

    usuario.confirmado = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta confirmada correctamente');
    res.redirect('/iniciar-sesion');
}