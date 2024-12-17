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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PlantsView.vue'),
    },
    {
      path: '/plants/:id',
      name: 'plantDetails',
      component: () => import('../views/PlantDetailsView.vue'),
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
    }
  ],
})

export default router
