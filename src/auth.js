export default function (Vue) {
  Vue.auth = {
    setUser (token, user) {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
    getUser () {
      return localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : null
    },
    getUserName () {
      return localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).altname : 'CATALOGO'
    },
    getMobilePhone () {
      return localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).mobilephone : '01800000000'
    },
    getInternalId () {
      return localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).internalid : '0'
    },
    isAuthenticated () {
      return !!this.getUser()
    }
  }
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return Vue.auth
      }
    }
  })
}
