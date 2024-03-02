<script setup>
import { ref } from 'vue';
/* import NavegacionP from './navegacionP.vue'; */

const rol = ref(localStorage.getItem('rol'));

const imagenes = [
    { url: 'https://raw.githubusercontent.com/sereto111/img2DAW/main/imagesHLC/1.jpg' },
    { url: 'https://raw.githubusercontent.com/sereto111/img2DAW/main/imagesHLC/2.jpg' },
    { url: 'https://raw.githubusercontent.com/sereto111/img2DAW/main/imagesHLC/3.jpg' },
];
</script>

<template>
    <div>
        <NavegacionP />

        <div class="divM">
            <div v-if="rol == 'Alumno'">
                <p>Bienvenido al panel del alumno</p>
            </div>
            <div v-if="rol == 'Profesor'">
                <p>Bienvenido al panel del profesor</p>
            </div>
        </div>



        <div id="carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div v-for="(imagen, index) in imagenes" :key="index"
                    :class="{ 'carousel-item': true, 'active': index === 0 }">
                    <img :src="imagen.url" class="d-block" alt="Imagen {{ index }}">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    </div>
</template>

<style scoped>
#carousel {
    margin-top: 40px;
    border-top: solid #00FF73 3px;
    border-bottom: solid #00FF73 3px;
}

img {
    width: 35%;
    height: auto;
    margin: 0 auto;
}

span {
    background-color: #00FF73;
}
</style>