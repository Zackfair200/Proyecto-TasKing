import Swal from "sweetalert2";

export const actualizarAvance = () => {
    // Seleccionamos las tareas existentes
    const tareas = document.querySelectorAll('li.tarea');

    if(tareas.length){
        // Seleccionamos las tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo');

        // Calculamos el avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);

        // Mostramos el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';

        if(avance === 100){
            Swal.fire(
                '✨¡Proyecto Completado!✨',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
    }
}