<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
/* import NavegacionP from '../components/navegacionP.vue'; */

const rol = ref(localStorage.getItem('rol'));

const router = useRouter();

const examenes = ref([]);

// Cargar los exámenes al iniciar el componente
const cargarExamenes = () => {
    const examenesLocalStorage = JSON.parse(localStorage.getItem('examenes')) || [];
    // Inicializar examenes con los datos del localStorage
    examenes.value = examenesLocalStorage;
};
cargarExamenes();

// Función para ordenar los exámenes según el criterio seleccionado
const ordenarExamenes = (criterio) => {
    switch (criterio) {
        case 'ascendente':
            examenes.value = examenes.value.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            break;
        case 'descendente':
            examenes.value = examenes.value.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            break;
        case 'creacion':
            cargarExamenes()
            break;
        default:
            error.log("Error inesperado");
            break;
    }
};
</script>

<template>
    <!-- <NavegacionP /> -->
    <div class="divM">
        <div>
            <h2 class="pM" v-if="rol == 'Profesor'">Exámenes Profesor</h2>
            <h2 class="pM" v-if="rol == 'Alumno'">Exámenes Alumno</h2>

            <p class="pM">Filtrar:</p>
            <!-- Select para elegir el criterio de ordenamiento -->
            <select @change="ordenarExamenes($event.target.value)">
                <option value="creacion">Orden de creación</option>
                <option value="ascendente">Fecha ascendente</option>
                <option value="descendente">Fecha descendente</option>
            </select>

            <ul>
                <li v-for="(examen, index) in examenes" :key="index">
                    <p>{{ examen.nombre }}</p>
                    <p>{{ examen.fecha }}</p>
                    <button v-if="rol == 'Profesor'"><router-link class="deco"
                            :to="'/verexamen/' + index">Ver</router-link></button>
                </li>
            </ul>
        </div>
        <div v-if="rol == 'Profesor'">
            <button><router-link class="deco" to="/crearexamen">Crear examen</router-link></button>
        </div>
    </div>
</template>

<style scoped>
.deco {
    text-decoration: none;
    color: #000;
}

.pM {
    margin-top: 15px;
}
</style>
