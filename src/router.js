import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contact-lists',
      component: () => import('./views/ContactLists.vue')
    },
    {
      path: '/contact/:id',
      name: 'contact-single',
      component: () => import('./views/ContactSingle.vue')
    }
  ]
})