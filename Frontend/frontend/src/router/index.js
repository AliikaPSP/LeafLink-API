import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/plantsView',
      name: 'plantsView',
      component: () => import('../views/PlantsView.vue'),
    },
    {
      path: '/plants/:id',
      name: 'plantDetails',
      component: () => import('../views/PlantDetailsView.vue'),
    },
    {
      path: '/plants/:id',
      name: 'plantUpdate',
      component: () => import('../views/PlantUpdateView.vue'),
    },
    {
      path: '/usersView',
      name: 'usersView',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/plantListView',
      name: 'plantListView',
      component: () => import('../views/PlantListsView.vue'),
    },
    {
      path: '/plantLists/:id/update',
      name: 'plantListUpdate',
      component: () => import('../views/PlantListUpdateView.vue'),
    },
    {
      path: '/plantLists/:id',
      name: 'plantListDetails',
      component: () => import('../views/PlantListDetailsView.vue'),
    },
  ],
})

export default router
