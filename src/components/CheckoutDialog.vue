<template>
	<v-dialog v-model="checkoutDialog.show" max-width="500px">
		<v-stepper v-model="e1">
			<v-stepper-header>
				<v-stepper-step :complete="e1 > 1" step="1" color="pink lighten-2"></v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="e1 > 2" step="2" color="pink lighten-2"></v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="e1 > 3" step="3" color="pink lighten-2"></v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="4" color="pink lighten-2"></v-stepper-step>
			</v-stepper-header>
			<v-stepper-items>
				<v-stepper-content step="1">
					<v-card>
						<v-card-text>
							<v-text-field
							ref="name"
							v-model="ccData.name"
							placeholder="Maria Perez"
							type="text"
							append-icon="account_box"
							label="Nombre"
							color="pink lighten-2"
							:rules="[() => !!ccData.name || 'Ingresa tu nombre.']"
							></v-text-field>
							<v-text-field
							ref="mobilephone"
							placeholder="5551234567"
							v-model="ccData.mobilephone"
							type="tel"
							append-icon="phone"
							label="Telefono"
							color="pink lighten-2"
							mask="############"
							:rules="[() => !!ccData.mobilephone || 'Ingresa tu telefono.']"
							></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-btn color="pink lighten-2" flat @click="e1 = 2" :disabled="!ccData.name || !ccData.mobilephone">SIGUIENTE</v-btn>
							<v-btn color="pink lighten-2" flat @click="checkoutDialog.show = false">CERRAR</v-btn>
						</v-card-actions>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="2">
					<v-card>
						<v-card-text>
							<v-text-field
							ref="address"
							v-model="ccData.address"
							placeholder="9335 Lee Hwy"
							type="text"
							append-icon="local_shipping"
							label="Dirección"
							color="pink lighten-2"
							:rules="[() => !!ccData.address || 'Ingresa tu dirección.']"
							></v-text-field>
							<v-text-field
							ref="zip"
							v-model="ccData.zipcode"
							type="tel"
							append-icon="person_pin_circle"
							label="Código Postal"
							placeholder="22031"
							color="pink lighten-2"
							mask="##### ####"
							:rules="[() => !!ccData.zipcode || 'Ingresa tu codigo postal.']"
							></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-btn color="pink lighten-2" flat @click="e1 = 3" :disabled="!ccData.address || !ccData.zipcode">SIGUIENTE</v-btn>
							<v-btn color="pink lighten-2" flat @click="e1 = 1">REGRESAR</v-btn>
						</v-card-actions>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="3">
					<v-card>
						<v-card-text>
							<v-text-field
							ref="number"
							v-model="ccData.number"
							type="tel"
							mask="#### #### #### ####"
							append-icon="credit_card"
							placeholder="4916 4784 9759 7878"
							label="Numero de la tarjeta"
							color="pink lighten-2"
							:rules="[() => !!ccData.number || 'Ingresa numero de tarjeta de credito.']"
							></v-text-field>
							<v-layout row>
									<v-text-field
									ref="expDate"
									v-model="exp_date"
									append-icon="date_range"
									label="Fecha"
									type="tel"
									placeholder="06/21"
									return-masked-value
									mask="##/##"
									@input="ccDataExpDate"
									color="pink lighten-2"
									:rules="[() => !!exp_date || 'Ingresa la fecha de expiración.']"
									></v-text-field>
									<span>&nbsp;</span>
									<v-text-field
									ref="cvc"
									v-model="ccData.cvc"
									append-icon="money"
									label="CVC"
									placeholder="125"
									type="tel"
									mask="####"
									color="pink lighten-2"
									:rules="[() => !!ccData.cvc || 'Ingresa codigo cvc.']"
									></v-text-field>
							</v-layout>
						</v-card-text>
						<v-card-actions>
							<v-layout column>
								<v-btn color="pink lighten-2" class="white--text" block @click="pay" :loading="paying" :disabled="paying || !ccData.number || !exp_date || !ccData.cvc">PAGAR ${{totalCart}}</v-btn>
								<br>
								<v-layout row>
									<v-btn color="pink lighten-2" flat @click="e1 = 2">REGRESAR</v-btn>
									<v-btn color="pink lighten-2" flat @click="checkoutDialog.show = false; ccData.cvc = ''; e1 = 1">CANCELAR</v-btn>
								</v-layout>
								</v-layout>
						</v-card-actions>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="4">
					<v-card>
						<div class="check_mark">
							<div class="sa-icon sa-success animate">
								<span class="sa-line sa-tip animateSuccessTip"></span>
								<span class="sa-line sa-long animateSuccessLong"></span>
								<div class="sa-placeholder"></div>
								<div class="sa-fix"></div>
							</div>
						</div>
						<v-card-title class="justify-center">
							<div class="headline">Pago Exitoso!</div>
						</v-card-title>
						<v-card-text>
							<div>Gracias por tu compra! Tu Asesora te contactara. Referencia de pago #<b>{{ paymentId }}</b>.</div>
						</v-card-text>
						<v-card-actions>
							<v-btn color="pink lighten-2" block flat @click="checkoutDialog.show = false; e1 = 1; paymentId = ''">CERRAR</v-btn>
						</v-card-actions>
					</v-card>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			paying: false,
			customer: this.$auth.getUserName(),
      paymentId: '',
			e1: 1,
      exp_date: '',
      ccData: {
        number: '',
        cvc: '',
        exp_month: '',
        exp_year: '',
        name: '',
        address: '',
        zipcode: '',
        mobilephone: ''
      }
		}
	},
	methods: {
		ccDataExpDate() {
      this.exp_date = this.dateFormatter(this.exp_date)
    },
    dateFormatter(value) {
      return value.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/'
      ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/'
      ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2'
      ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
      ).replace(
        /^([0]+)\/|[0]+$/g, '0'
      ).replace(
        /[^\d\/]|^[\/]*$/g, ''
      ).replace(
        /\/\//g, '/'
      );
		},
		pay() {
      this.paying = true;
      var expDate = this.exp_date;
      this.ccData.exp_month = expDate.split('/')[0]
      this.ccData.exp_year = expDate.split('/')[1]
      this.$http.post(
        this.$apiURL + '/payment', 
        { 
          octopux_token: 'f550a68b-21ff-4b33-aa04-bff68023acca', 
          amount: this.totalCart,
          internalid: this.$auth.getInternalId(),
          name: this.ccData.name,
          number: this.ccData.number,
          exp_month: this.ccData.exp_month,
          exp_year: this.ccData.exp_year,
          cvc: this.ccData.cvc,
          address: this.ccData.address,
          zipcode: this.ccData.zipcode,
          mobilephone: this.ccData.mobilephone
        }
      ).then(function(response) {
				this.paymentId = response.data.transactionnumber
				this.processOrder()
      }.bind(this)).catch(function(error) {
				console.log(error)
        this.paying = false
       	this.notification.message = 'Fallo al realizar el pago (cd-p-00)',
				this.notification.show = true
      }.bind(this))
		},
		processOrder() {
			var customerInfo = {
				name: this.ccData.name,
				address: this.ccData.address,
				address2: '',
				mobilephone: this.ccData.mobilephone,
				zipcode: this.ccData.zipcode,
				payment_id: this.paymentId
			}
			this.$http.post(
				this.$apiURL + '/multivendor/process/order', 
				{ 
					octopux_token: 'f550a68b-21ff-4b33-aa04-bff68023acca', 
					cart_items: this.cartItems, 
					customer: this.$auth.getUser(), 
					customer_client: customerInfo,
					total: this.totalCart
				}
			).then(function(response) {
				this.e1 = 4
				this.paying = false
				this.$store.commit('clearCart')
				this.ccData.number = ''
        this.ccData.cvc = '',
        this.ccData.exp_month = ''
        this.ccData.exp_year = ''
        this.ccData.name = ''
        this.ccData.address = ''
        this.ccData.zipcode = ''
				this.ccData.mobilephone = ''
				this.exp_date = ''
			}.bind(this)).catch(function(error) {
				this.paying = false
				this.notification.message = 'Fallo al procesar la orden (cd-po-00)',
				this.notification.show = true
			}.bind(this))
		}
	},
	computed: {
		...mapGetters({
			checkoutDialog: 'checkoutDialog',
			totalCart: 'totalCart',
			cartItems: 'cartItems',
			notification: 'notification'
		})
	}
}
</script>