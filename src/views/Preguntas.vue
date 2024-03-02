<script setup>
import { ref } from 'vue';
/* import NavegacionP from '../components/navegacionP.vue'; */

const nuevoEnunciado = ref('');
const nuevaCategoria = ref('');
const preguntas = ref(JSON.parse(localStorage.getItem('preguntas')) || []);
const categorias = ref(JSON.parse(localStorage.getItem('categorias')) || []);

function agregarPregunta() {
  // No permitir preguntas sin enunciado o sin categoría
  if (nuevoEnunciado.value.trim() === '' || nuevaCategoria.value === '') {
    return;
  }

  // No permitir preguntas iguales de la misma categoría
  if (preguntas.value.some(pregunta => pregunta.enunciado === nuevoEnunciado.value && pregunta.categoria === nuevaCategoria.value)) {
    alert('La pregunta que estás intentando añadir ya existe');
    return;
  }

  preguntas.value.push({ enunciado: nuevoEnunciado.value, categoria: nuevaCategoria.value });
  guardarPreguntas();
  nuevoEnunciado.value = '';
}

function eliminarPregunta(index) {
  preguntas.value.splice(index, 1);
  guardarPreguntas();
}

function obtenerNombreCategoria(idCategoria) {
  const categoria = categorias.value.find(categoria => categoria.nombre === idCategoria);
  return categoria ? categoria.nombre : 'Categoría no encontrada';
}

function guardarPreguntas() {
  localStorage.setItem('preguntas', JSON.stringify(preguntas.value));
}
</script>

<template>
  <div class="divM">
    <!-- <NavegacionP/> -->
    
    <!-- Listar | Eliminar -->
    <h2>Listar preguntas</h2>
    <ul>
      <li v-for="(pregunta, index) in preguntas" :key="index">
        <p>{{ pregunta.enunciado }}</p>
        <p>Categoría: {{ obtenerNombreCategoria(pregunta.categoria) }}</p>
        <button @click="eliminarPregunta(index)">Eliminar</button>
      </li>
    </ul>

    <!-- Crear -->
    <h2>Crear pregunta</h2>
    <input type="text" placeholder="Enunciado" v-model="nuevoEnunciado">
    <select v-model="nuevaCategoria">
      <option v-for="(categoria, index) in categorias" :key="index">{{ categoria.nombre }}</option>
    </select>
    <button @click="agregarPregunta">Agregar</button>
  </div>
</template>

<style scoped></style>