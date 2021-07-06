import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import firebase from 'firebase/app'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'home' },
    component: () => import('@/views/Home'),
  },

  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login'),
  },

  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import('@/views/Register'),
  },

  {
    path: '/bill',
    name: 'Bill',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Bill'),
  },

  {
    path: '/outcome',
    name: 'Outcome',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Outcome'),
  },

  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Planning'),
  },

  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/History'),
  },

  {
    path: '/categoriesIncome',
    name: 'CategoriesIncome',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/CategoriesIncome'),
  },

  {
    path: '/categoriesOutcome',
    name: 'CategoriesOutcome',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/CategoriesOutcome'),
  },

  {
    path: '/currencies',
    name: 'Currency',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Currency'),
  },

  {
    path: '/support',
    name: 'Support',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Support'),
  },

  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Profile'),
  },

  {
    path: '/detail/:id',
    name: 'Detail',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Detail'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

/*Protecting routes*/
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
