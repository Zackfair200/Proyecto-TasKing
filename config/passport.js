const passport = require ('passport');
const LocalStrategy = require('passport-local');

// Traemos el modelo Usuarios donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

// Login con credenciales propios (usuario y contraseña)
passport.use(
    new LocalStrategy(

        // El primer parámetro es un objeto con los parametros que passport va a validar
        {
            usernameField: 'email',
            passwordField: 'password'
        },

        // El segundo parámetro es la consulta a la base de datos para saber si existe o no una cuenta, comprobar si el password esta mal introducido etc
        async (email, password, done) => {
            // COMPROBAMOS EL CORREO, si existe, entrará en el try y usuario almacenara la promesa que devuelve la peticion a la BBDD
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email: email,
                        confirmado: 1
                    }
                })
                // COMPROBAMOS SI LA CONTRASEÑA NO COINCIDE
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    })
                }

                return done(null, usuario);

            // Si no existe el correo el error lo captura el catch y devolverá un mensaje, ya que los otros dos parámetros no los necesitamos (error, usuario, mensaje)
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

// Passport necesita serializar el usuario y deserializarlo para acceder a los valores del usuario...
// ...vamos que lo de abajo es obligatorio con passport, o no se pueden acceder a los valores del objeto usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;