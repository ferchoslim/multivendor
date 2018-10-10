<template>
  <v-layout justify-center column fill-height>
    <v-flex xs12>
      <div v-if="cartItems.length == 0" class="container fluid fill-height">
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <img src="../assets/empty-cart.png" style="width: 100%;" />
            <h3>Carrito Vacío, Vamos de Compras!</h3>
          </v-flex>
        </v-layout>
      </div>
      <v-card v-for="(cartItem, index) in cartItems" :key="index">
        <v-layout row>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <h3>{{cartItem.name}}</h3>
                <div>Talla: {{cartItem.size}}</div>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex xs5>
            <v-card-media
              :src="cartItem.image"
              height="125px"
              contain
            ></v-card-media>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          <h3>Cantidad: <span>{{cartItem.quantity}}</span></h3>
          <v-spacer></v-spacer>
          <v-btn color="red" outline small @click="removeFromCart(index)">QUITAR</v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-xs-right" v-if="cartItems.length != 0">
        <v-btn large dark color="pink lighten-2" class="mx-0" @click="paymentMethodDialog.show = true" :disabled="cartItems.length == 0">
          PAGAR AHORA ${{totalCart}}
          <v-icon right>arrow_forward</v-icon>
        </v-btn>
      </div>
    </v-flex>
    
    <payment-method-dialog></payment-method-dialog>
    
    <checkout-dialog></checkout-dialog>

    <emprendedora-pago-dialog></emprendedora-pago-dialog>

  </v-layout>
</template>
<style>
.v-stepper__content {
  padding: 0px !important;
}
.check_mark {
  width: 80px;
  height: 130px;
  margin: 0 auto;
}

button {
  cursor: pointer;
  margin-left: 15px;
}

.hide{
  display:none;
}

.sa-icon {
  width: 80px;
  height: 80px;
  border: 4px solid gray;
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  margin: 20px auto;
  padding: 0;
  position: relative;
  box-sizing: content-box;
}

.sa-icon.sa-success {
  border-color: #4CAF50;
}

.sa-icon.sa-success::before, .sa-icon.sa-success::after {
  content: '';
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 120px;
  background: white;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sa-icon.sa-success::before {
  -webkit-border-radius: 120px 0 0 120px;
  border-radius: 120px 0 0 120px;
  top: -7px;
  left: -33px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 60px 60px;
  transform-origin: 60px 60px;
}

.sa-icon.sa-success::after {
  -webkit-border-radius: 0 120px 120px 0;
  border-radius: 0 120px 120px 0;
  top: -11px;
  left: 30px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0px 60px;
  transform-origin: 0px 60px;
}

.sa-icon.sa-success .sa-placeholder {
  width: 80px;
  height: 80px;
  border: 4px solid rgba(76, 175, 80, .5);
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
}

.sa-icon.sa-success .sa-fix {
  width: 5px;
  height: 90px;
  background-color: white;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.sa-icon.sa-success.animate::after {
  -webkit-animation: rotatePlaceholder 4.25s ease-in;
  animation: rotatePlaceholder 4.25s ease-in;
}

.sa-icon.sa-success {
  border-color: transparent\9;
}
.sa-icon.sa-success .sa-line.sa-tip {
  -ms-transform: rotate(45deg) \9;
}
.sa-icon.sa-success .sa-line.sa-long {
  -ms-transform: rotate(-45deg) \9;
}

.animateSuccessTip {
  -webkit-animation: animateSuccessTip 0.75s;
  animation: animateSuccessTip 0.75s;
}

.animateSuccessLong {
  -webkit-animation: animateSuccessLong 0.75s;
  animation: animateSuccessLong 0.75s;
}

@-webkit-keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
@-webkit-keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

.sa-icon.sa-success .sa-line {
  height: 5px;
  background-color: #4CAF50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 2;
}

.sa-icon.sa-success .sa-line.sa-tip {
  width: 25px;
  left: 14px;
  top: 46px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sa-icon.sa-success .sa-line.sa-long {
  width: 47px;
  right: 8px;
  top: 38px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

@-webkit-keyframes rotatePlaceholder {
  0% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
}
@keyframes rotatePlaceholder {
  0% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import EmprendedoraPagoDialog from '@/components/EmprendedoraPagoDialog.vue'
import CheckoutDialog from '@/components/CheckoutDialog.vue'
import PaymentMethodDialog from '../components/PaymentMethodDialog.vue'

export default {
  methods: {
    removeFromCart(cartItem) {
      this.$store.commit('removeFromCart', cartItem)
    }
  },
  computed: {
    ...mapGetters({
      totalCart: 'totalCart',
      cartItems: 'cartItems',
      notification: 'notification',
      paymentMethodDialog: 'paymentMethodDialog'
    })
  },
  mounted() {
    if (localStorage.getItem('cartItems')) {
      this.$store.commit('cartItems', JSON.parse(localStorage.getItem('cartItems')))
    }
  },
  components: {
    'emprendedora-pago-dialog': EmprendedoraPagoDialog,
    'checkout-dialog': CheckoutDialog,
    'payment-method-dialog': PaymentMethodDialog
  }
}
</script>