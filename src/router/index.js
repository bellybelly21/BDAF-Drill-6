import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Opinion from '@/views/Opinion.vue'
import NotFound from '@/views/NotFound.vue'

const AUTENTICACION = ()=> import('@/views/Autenticacion.vue');
const ADMINISTRACION = ()=> import('@/views/Administracion.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/opinion/:gameName',
      name: 'opinion',
      component: Opinion,
    },
    {
      path: '/autenticacion',
      name: 'autenticacion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AUTENTICACION,
    },
    {
      path: '/administracion',
      name: 'administracion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ADMINISTRACION,
    },
    {
      path:'/:pathMatch(.*)*',
      name: 'NotFound', 
      component: NotFound,
    }
  ],
})

export default router
