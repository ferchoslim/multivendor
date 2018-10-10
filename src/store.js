import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 'catalog',
    notification: {
      show: false,
      message: '',
      timeout: 3000
    },
    paymentMethodDialog: {
      show: false
    },
    contactDialog: {
      show: false
    },
    emprendedoraPagoDialog: {
      show: false
    },
    checkoutDialog: {
      show: false
    },
    itemOptionsDialog: {
      open: false,
      size: true,
      sizes: [],
      quantities: [],
      saleprice: '',
      name: ''
    },
    cartItems: [],
    category: '78993358966',
    categories: [
      { name: 'Jeans', collection_id: 78993358966 },
      { name: 'Fajas', collection_id: 83403636854 },
      { name: 'Compresión Suave', collection_id: 83403440246 },
      { name: 'Sport Life', collection_id: 83403341942 },
      { name: 'Ropa Interior', collection_id: 83252379766 },
      { name: 'Oro Laminado 18K', collection_id: 78993653878 },
      { name: 'Shorts', collection_id: 79978496118 },
      { name: 'Prendas Control', collection_id: 80160456822 },
      { name: 'Plata Ley 925', collection_id: 79000404086 },
      { name: 'Oro 14K', collection_id: 78993588342 },
      { name: 'Oro 10K', collection_id: 78993621110 },
      { name: 'Oro – Plata', collection_id: 78993719414 },
      { name: 'Acero', collection_id: 79000338550 }
    ],
    catalogItems: []
  },
  getters: {
    currentPage: (state) => {
      return state.currentPage
    },
    contactDialog: (state) => {
      return state.contactDialog
    },
    notification: (state) => {
      return state.notification
    },
    catalogItems: (state) => {
      return state.catalogItems
    },
    paymentMethodDialog: (state) => {
      return state.paymentMethodDialog
    },
    emprendedoraPagoDialog: (state) => {
      return state.emprendedoraPagoDialog
    },
    checkoutDialog: (state) => {
      return state.checkoutDialog
    },
    itemOptionsDialog: (state) => {
      return state.itemOptionsDialog
    },
    category: (state) => {
      return state.category
    },
    categories: (state) => {
      return state.categories
    },
    cartItems: (state) => {
      return state.cartItems
    },
    totalCart: (state) => {
      var sum = 0
      state.cartItems.forEach(function (item) {
        sum += (item.saleprice * item.quantity)
      })
      return sum.toFixed(2)
    },
    totalCartItems: (state) => {
      var sum = 0
      state.cartItems.forEach(function (item) {
        sum += (item.quantity)
      })
      return sum
    }
  },
  mutations: {
    currentPage: (state, page) => {
      state.currentPage = page
    },
    paymentMethodDialog: (state, payload) => {
      state.paymentMethodDialog.show = payload.show
    },
    contactDialog: (state, payload) => {
      state.contactDialog.open = payload.open
    },
    notification: (state, payload) => {
      state.notification.show = payload.show
      state.notification.message = payload.message
    },
    catalogItems: (state, payload) => {
      state.catalogItems = payload
    },
    cartItems: (state, payload) => {
      state.cartItems = payload
    },
    removeFromCart: (state, payload) => {
      state.cartItems = state.cartItems.filter(function (cartItem, index) {
        return index !== payload
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    checkoutDialog: (state, payload) => {
      state.checkoutDialog.open = payload.open
    },
    emprendedoraPagoDialog: (state, payload) => {
      state.emprendedoraPagoDialog.open = payload.open
    },
    itemOptionsDialog: (state, payload) => {
      state.itemOptionsDialog.quantities = []
      state.itemOptionsDialog.sizes = []
      state.itemOptionsDialog.open = payload.open
      state.itemOptionsDialog.size = true
      state.itemOptionsDialog.sizes = payload.sizes
      state.itemOptionsDialog.name = payload.name
      state.itemOptionsDialog.saleprice = payload.saleprice
      state.itemOptionsDialog.image = payload.image
    },
    itemOptionsDialogQuantity: (state, payload) => {
      var quantity = (payload.quantity > 20) ? 20 : payload.quantity
      for (var i = 1; i <= quantity; i++) {
        state.itemOptionsDialog.quantities.push(i)
      }
    },
    selectCategory: (state, payload) => {
      state.category = payload
    },
    addToCart: (state, payload) => {
      state.cartItems.push({
        sku: payload.sku,
        name: payload.name,
        saleprice: payload.saleprice,
        size: payload.size,
        quantity: payload.quantity,
        quantities: payload.quantities,
        image: payload.image
      })
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    }
  },
  actions: {
    paymentMethodDialogTurn: (state, turn) => {
      state.paymentMethodDialog.show = turn
    }
  }
})
