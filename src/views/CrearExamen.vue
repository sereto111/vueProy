<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
/* import NavegacionP from '../components/navegacionP.vue'; */

const rol = ref(localStorage.getItem('rol'));

const router = useRouter();

const titulo = ref('');
const fecha = ref('');
const preguntas = ref([]);
const categoriaFiltrada = ref('');

// Obtener las opciones de categorías del localStorage
const categoriasLocalStorage = JSON.parse(localStorage.getItem('categorias')) || [];

// Función para obtener preguntas del localStorage
function obtenerPreguntasLocalStorage() {
    const preguntasLocalStorage = JSON.parse(localStorage.getItem('preguntas')) || [];
    // Filtrar preguntas por categoría si se especifica una categoría filtrada
    preguntas.value = categoriaFiltrada.value ? preguntasLocalStorage.filter(pregunta => pregunta.categoria === categoriaFiltrada.value) : preguntasLocalStorage.map(pregunta => ({
        enunciado: pregunta.enunciado,
        categoria: pregunta.categoria,
        seleccionada: false
    }));
}

obtenerPreguntasLocalStorage();

function crearExamen() {
    // Validar campos obligatorios
    if (!titulo.value || !fecha.value || preguntas.value.filter(pregunta => pregunta.seleccionada).length === 0) {
        alert('Complete todos los campos obligatorios y seleccione al menos una pregunta.');
        return;
    }

    // Guardar el examen si pasa la validación
    const preguntasExamen = preguntas.value.filter(pregunta => pregunta.seleccionada);
    const examen = { nombre: titulo.value, fecha: fecha.value, preguntas: preguntasExamen };
    // Obtener exámenes del localStorage o inicializar si no hay
    const examenesLocalStorage = JSON.parse(localStorage.getItem('examenes')) || [];
    // Guardar nuevo examen
    examenesLocalStorage.push(examen);
    localStorage.setItem('examenes', JSON.stringify(examenesLocalStorage));
    // Redirigir a la vista de lista de exámenes
    router.push('/examenes');
}
</script>

<template>
    <!-- <NavegacionP /> -->
    <div class="divM" v-if="rol == 'Profesor'">
        <p>Crear Exámen</p>
        <input type="text" v-model="titulo" placeholder="Título del examen">
        <input type="date" v-model="fecha">
        <p>Filtrar por categoría:</p>
        <!-- Agregar filtro de categoría -->
        <select v-model="categoriaFiltrada" @change="obtenerPreguntasLocalStorage()">
            <option value="">Todas las categorías</option>
            <option v-for="(categoria, index) in categoriasLocalStorage" :key="index" :value="categoria.nombre">{{
                categoria.nombre }}</option>
        </select>
        <p>Preguntas:</p>
        <ul>
            <li v-for="(pregunta, index) in preguntas" :key="index">
                <input type="checkbox" v-model="pregunta.seleccionada"><span id="mL">Enunciado:</span> {{ pregunta.enunciado
                }} | <span>Categoría:</span> {{ pregunta.categoria }}
            </li>
        </ul>
        <button @click="crearExamen">Guardar examen</button>
    </div>
</template>

<style scoped>
p {
    margin-top: 15px;
}

li {
    list-style-type: none;
}

#mL {
    margin-left: 5px;
}

span {
    font-weight: 700;
}
</style>
