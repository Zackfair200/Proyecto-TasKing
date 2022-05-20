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

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({where: { id }});

    // Cambio el estado de la tarea...
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    // ...save() lo guarda en la base de datos...
    const resultado = await tarea.save();

    // ...si hay problemas de conexión evitamos que se ejecute nuestra respuesta
    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res) => {

    const {id} = req.params;

    // Eliminar la tarea
    const resultado = await Tareas.destroy({where: { id }});

    if(!resultado) return next();

    res.status(200).send('Tarea Eliminada Correctamente');
}