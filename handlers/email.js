const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

// Declaramos el primer parámetro del envio, que es la llamada a las credenciales de la app Mailtrap
let transport = nodemailer.createTransport(emailConfig);

// Genero el html
const generarHTML = (archivo, opciones={}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

exports.enviar = async (opciones) => {
    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.fromString(html);
    // Traigo la configuracion directamente de https://nodemailer.com/about/
    let info = {
        from: 'TasKing <no-reply@tasking.com>', // sender address
        to: opciones.usuario.email, // list of receivers
        subject: opciones.subject, // Subject line
        text: text,
        html: html,
    };

    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport, info)
    
}



