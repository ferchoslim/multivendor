import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Axios from 'axios'
import auth from './auth'

Vue.use(auth)
Vue.prototype.$http = Axios
Vue.config.productionTip = false
// Vue.prototype.$apiURL = 'http://apps4you.sytes.net/api/v1'
Vue.prototype.$apiURL = 'https://octopux.app/api/v1'

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.gest)) {
      if (Vue.auth.isAuthenticated()) {
        next({
          path: '/catalogo'
        })
      } else next()
    } else if (to.matched.some(record => record.meta.user)) {
      if (!Vue.auth.isAuthenticated()) {
        next({
          path: '/'
        })
      } else next()
    } else next()
  }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
