<script setup>
import NavegacionP from '../components/navegacionP.vue';
import router from '@/router';
import { ref } from 'vue';

const nombre = ref(localStorage.getItem('usuario'));

const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    router.push("/logoutmsg").then(() => {
        // Después de la navegación exitosa, recargar la página para cargar los datos del localStorage
        location.reload();
    });
    //En caso de querer actualizar el boton sin recargar
    //window.location.href = "/logoutmsg";
}

</script>

<template>
    <div id="cabecera">
        <div id="cont">
            <h2>GESTOR DE EXÁMENES</h2>
            <NavegacionP />
            <br>
            <!-- <p v-if="datosSesionGlobal.nombre">Bienvenido {{ datosSesionGlobal.nombre }}</p> -->
            <div v-if="nombre">
                <p>Bienvenido, {{ nombre }}</p>
                <!-- <input @click="cerrarSesion" type="button" value="Cerrar sesión" /> -->
                <!-- Botón cerrar sesión -->
                <button @click="cerrarSesion" class="Btn">
                    <div class="sign"><svg viewBox="0 0 512 512">
                            <path
                                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                            </path>
                        </svg></div>
                    <div class="text">Cerrar sesión</div>
                </button>
            </div>
            <div v-else>
                <RouterLink class="deco" to="/login">
                    <!-- <input type="button" value="Iniciar sesión" /> -->
                    <!--  Botón iniciar sesión -->
                    <button class="cssbuttons-io-button">
                        Iniciar sesión
                        <div class="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    fill="currentColor"></path>
                            </svg>
                        </div>
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
    <RouterView @datosActualizados="recuperarDatos" />
</template>

<style scoped>
#cabecera {
    background-color: #00ff73;
}

#cont {
    margin-left: 5px;
    padding-bottom: 5px;
}

.deco {
    text-decoration: none;
}

/* Botón cerrar sesión */
.Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(60, 151, 255);
}

.sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sign svg {
    width: 17px;
}

.sign svg path {
    fill: white;
}

.text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
}

.Btn:hover {
    width: 205px;
    border-radius: 40px;
    transition-duration: .3s;
}

.Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
}

.Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
}

.Btn:active {
    transform: translate(2px, 2px);
}

/* Botón iniciar sesión */
.cssbuttons-io-button {
    background: rgb(60, 151, 255);
    color: #FFF;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em rgb(6, 79, 163);
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
    cursor: pointer;
}

.cssbuttons-io-button .icon {
    background: #FFF;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em rgb(7, 56, 112);
    right: 0.3em;
    transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: rgb(60, 151, 255);
}

.cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
    transform: scale(0.95);
}
</style>