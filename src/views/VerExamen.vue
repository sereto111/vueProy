<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
/* import NavegacionP from '../components/navegacionP.vue'; */

const rol = ref(localStorage.getItem('rol'));

const router = useRouter();

// Obtener el índice del examen de los parámetros de la ruta
const examenIndex = parseInt(router.currentRoute.value.params.index);

// Cargar los exámenes desde localStorage
const examenesLocalStorage = JSON.parse(localStorage.getItem('examenes')) || [];
const examen = ref(examenesLocalStorage[examenIndex]);
</script>

<template>
    <!-- <NavegacionP /> -->
    <div class="divM" v-if="rol == 'Profesor'">
        <p>Examen: {{ examen.nombre }}</p>
        <p>Fecha: {{ examen.fecha }}</p>
        <p>Preguntas:</p>
        <ul>
            <li v-for="(pregunta, index) in examen.preguntas" :key="index">
                {{ pregunta.enunciado }}
            </li>
        </ul>
    </div>
</template>
  
<style scoped>
    
</style>