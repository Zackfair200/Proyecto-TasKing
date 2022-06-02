const passport = require('passport');

// Usamos un método de passport llamado authenticate para que, una vez validado tome una decisión...
// ...si la validacion es correcta, ira a la página principal, y si no es correcta retornara a la misma página
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});