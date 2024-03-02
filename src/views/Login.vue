<script setup>
import router from '@/router';
import { ref } from 'vue';

const emits = defineEmits("datosActualizados")

const nombre = ref("");
const rol = ref("");
const error = ref('');

const iniciarSesion = () => {
  fetch("../../datos.json")
    .then(response => response.json())
    .then(usuarios => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.nombre === nombre.value && usuario.rol === rol.value);
      console.log(usuarioEncontrado);
      if (usuarioEncontrado != undefined) {
        // Inicio de sesión exitoso
        localStorage.setItem('usuario', nombre.value);
        localStorage.setItem('rol', rol.value);
        //En caso de querer ver los cambios del localStorage antes de recargar
        //window.location.href = "/";
        router.push("/").then(() => {
          // Después de la navegación exitosa, recargar la página para cargar los datos del localStorage
          location.reload();
        });
      } else {
        error.value = "Nombre de usuario o rol incorrectos.";
      }
    })
    .catch(error => console.error("Error al iniciar sesión:", error));
}
</script>

<template>
  <div class="divM">
    <p>Bienvenido {{ nombre }}</p>
    <input type="text" placeholder="nombre" v-model="nombre">
    <select v-model="rol">
      <option value="Profesor">Profesor</option>
      <option value="Alumno">Alumno</option>
    </select>
    <button @click="iniciarSesion">Iniciar Sesión</button>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>
