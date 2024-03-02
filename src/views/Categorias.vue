<script setup>
import { ref } from 'vue';
/* import NavegacionP from '../components/navegacionP.vue'; */

const nuevaCategoria = ref('');
const categorias = ref(JSON.parse(localStorage.getItem('categorias')) || []);

function aniadirCategoria() {
    const nombreCategoria = nuevaCategoria.value.trim();
    // No permitir categorías vacías
    if (nombreCategoria === '') {
        return;
    }

    // No permitir categorías con el mismo nombre
    if (categorias.value.some(categoria => categoria.nombre === nombreCategoria)) {
        alert('La categoría que estás intentando añadir ya existe');
        return;
    }

    categorias.value.push({ nombre: nombreCategoria });
    guardarCategorias();
    nuevaCategoria.value = '';
}

function eliminarCategoria(index) {
    categorias.value.splice(index, 1);
    guardarCategorias();
}

function modificarCategoria(index, nuevoNombre) {
    categorias.value[index].nombre = nuevoNombre;
    guardarCategorias();
}

function guardarCategorias() {
    localStorage.setItem('categorias', JSON.stringify(categorias.value));
}
</script>

<template>
    <div class="divM">
        <!-- <NavegacionP /> -->

        <!-- Listar | Modificar | Eliminar -->
        <h2>Listar categorías</h2>
        <ul>
            <li v-for="(categoria, index) in categorias" :key="index">
                <input type="text" v-model="categoria.nombre" @change="modificarCategoria(index, categoria.nombre)">
                <button @click="eliminarCategoria(index)">Eliminar</button>
            </li>
        </ul>

        <!-- Crear -->
        <h2>Crear categoría</h2>
        <input type="text" placeholder="Nombre" v-model="nuevaCategoria">
        <button @click="aniadirCategoria">Añadir</button>
    </div>
</template>
  
<style scoped></style>
  