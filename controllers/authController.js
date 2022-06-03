const passport = require('passport');

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