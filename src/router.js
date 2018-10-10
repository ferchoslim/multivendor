import Vue from 'vue'
import Router from 'vue-router'
import Catalog from './views/Catalog.vue'
import Cart from './views/Cart.vue'
import Categories from './views/Categories.vue'
import Auth from './views/Auth.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/catalogo',
      name: 'catalog',
      component: Catalog,
      meta: {
        user: true
      }
    },
    {
      path: '/carrito',
      name: 'cart',
      component: Cart,
      meta: {
        user: true
      }
    },
    {
      path: '/categorias',
      name: 'categories',
      component: Categories,
      meta: {
        user: true
      }
    },
    {
      path: '/',
      name: 'auth',
      component: Auth,
      meta: {
        gest: true
      }
    },
    {
      path: '/:mobilephone',
      name: 'authAndLogIn',
      component: Auth,
      meta: {
        gest: true
      }
    }
  ]
})
