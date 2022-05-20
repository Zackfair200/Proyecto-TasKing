import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', (e) => {

        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            // patch es un metodo similar al update pero que se centra solo en modificar un parametro...
            // ...no recompone el objeto de nuevo y usa dos parámetros, la url donde mandas la petición...
            // ...y despues el parametro que quieres cambiar
            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                    }
                })
        }

        if(e.target.classList.contains('fa-trash')){
            console.log(e.target);
            const tareaHTML = e.target.parentElement.parentElement, idTarea = tareaHTML.dataset.tarea;
            
            Swal.fire({
                title: '¿Deseas borrar esta tarea?',
                text: "¡Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText: "No, Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${location.origin}/tareas/${idTarea}`;

                    // Enviamos el delete con axios
                    axios.delete(url, { params: { idTarea }})
                        .then(function(respuesta) {
                            if(respuesta.status === 200){
                                console.log(respuesta);
                                // Borramos el nodo del html
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                // Agrego una alerta
                                Swal.fire(
                                    'Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                            }
                        });
                }
              })
        }
    });

}

export default tareas;