<script setup>
    import { ref } from 'vue';
    
    const rol = ref(localStorage.getItem('rol'));
</script>

<template>
    <ul id="nav">
        <li><a href="/">Inicio</a></li>
        <li v-if="rol == 'Profesor'"><a href="/categorias">Categorías</a></li>
        <li v-if="rol == 'Profesor'"><a href="/preguntas">Preguntas</a></li>
        <li v-if="rol == 'Alumno' || rol == 'Profesor'"><a href="/examenes">Exámenes</a></li>        
    </ul>
    <br>
</template>

<style scoped>
#nav {
    list-style: none;

}

#nav li {
    background-color: #F6E3CA;
    border: #D7C8B6 2px solid;
    float: left;
    margin-right: 10px;
    padding: 0 4px;
}
</style>