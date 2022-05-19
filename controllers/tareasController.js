const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    // Obtenemos los parametros del proyecto actual
    const proyecto = await Proyectos.findOne({where: { url: req.params.url }});

    // Leemos el valor del input
    const {tarea} = req.body;

    // Estado 0 = incompleto y ID del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertamos en la BBDD
    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    // Redireccionamos al final
    res.redirect(`/proyectos/${req.params.url}`);
}