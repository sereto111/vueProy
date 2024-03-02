<script setup>
import router from '@/router';

function goInicio() {    
    router.push("/");
}
</script>

<template>
    <div class="divM">
        <p>Se ha cerrado la sesión</p>
        <button @click="goInicio">Volver a Inicio</button>
    </div>
</template>

<style scoped></style>