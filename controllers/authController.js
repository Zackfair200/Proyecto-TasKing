const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');//--> Utilidad incluida en NodeJS para generar tokens

// Autenticar usuario
// Usamos un método de passport llamado authenticate para que, una vez validado tome una decisión...
// ...si la validacion es correcta, ira a la página principal, y si no es correcta, retornara a la misma página
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

// Comprobar si el usuario esta autenticado
exports.usuarioAutenticado = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/iniciar-sesion');
}

// Cerrar sesion (destroy es un metodo de session que rompe la sesion)
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

// Verificamos que el usuario existe y genera un token
exports.enviarToken = async (req, res) => {
    // Traemos el usuario validando por mail
    const usuario = await Usuarios.findOne({
        where: {
            email: req.body.email
        }
    });

    // Si no existe el usuario
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta de usuario')
        res.redirect('/reestablecer');
    }

    // Si el usuario existe creamos el token con duración de 1h
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    await usuario.save();

    // Ruta para reset del token
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    res.redirect(`/reestablecer/${ usuario.token }`);
}

exports.resetPassword = async (req, res) => {
    res.json(req.params.token);
}