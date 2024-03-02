import { createRouter, createWebHistory } from 'vue-router';
import Contenido from '../components/contenido.vue'
/* import HomeView from '../views/HomeView.vue' */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Contenido
    },
    {
      path: '/home',
      name: 'home',
      component: Contenido
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/logoutmsg',
      name: 'logoutmsg',
      component: () => import('../views/LogoutMsg.vue')
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/Categorias.vue')
    },
    {
      path: '/preguntas',
      name: 'preguntas',
      component: () => import('../views/Preguntas.vue')
    },
    {
      path: '/examenes',
      name: 'examenes',
      component: () => import('../views/Examenes.vue')
    },
    {
      path: '/crearexamen',
      name: 'crearexamen',
      component: () => import('../views/CrearExamen.vue')
    },
    {
      path: '/verexamen/:index',
      name: 'verexamen',
      component: () => import('../views/VerExamen.vue')
    }
  ]
})

export default router
