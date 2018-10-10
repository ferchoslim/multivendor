<template>
	<v-dialog v-model="emprendedoraPagoDialog.show" max-width="500px">
		<v-stepper v-model="e1">
			<v-stepper-header>
				<v-stepper-step :complete="e1 > 1" step="1" color="pink lighten-2"></v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step :complete="e1 > 2" step="2" color="pink lighten-2"></v-stepper-step>
				<v-divider></v-divider>
				<v-stepper-step step="3" color="pink lighten-2"></v-stepper-step>
			</v-stepper-header>
			<v-stepper-items>
				<v-stepper-content step="1">
					<v-card>
						<v-card-text>
							<v-text-field
							ref="name"
							v-model="customerInfo.name"
							type="text"
							append-icon="account_box"
							label="Nombre"
							placeholder="Maria Perez"
							color="pink lighten-2"
							:rules="[() => !!customerInfo.name || 'Ingresa tu nombre.']"
							></v-text-field>
							<v-text-field
							ref="mobilephone"
							v-model="customerInfo.mobilephone"
							type="tel"
							placeholder="5551234567"
							append-icon="phone"
							label="Telefono"
							color="pink lighten-2"
							mask="############"
							:rules="[() => !!customerInfo.mobilephone || 'Ingresa tu telefono.']"
							></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-btn color="pink lighten-2" flat @click="e1 = 2" :disabled="!customerInfo.name || !customerInfo.mobilephone">SIGUIENTE</v-btn>
							<v-btn color="pink lighten-2" flat @click="emprendedoraPagoDialog.show = false; e1 = 1">CERRAR</v-btn>
						</v-card-actions>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="2">
					<v-card>
						<v-card-text>
							<v-text-field
							ref="address"
							v-model="customerInfo.address"
							type="text"
							append-icon="local_shipping"
							label="Dirección"
							color="pink lighten-2"
							placeholder="9335 Lee Hwy"
							:rules="[() => !!customerInfo.address || 'Ingresa tu dirección.']"
							></v-text-field>
							<v-text-field
							ref="address2"
							v-model="customerInfo.address2"
							type="text"
							label="Apartamento, edificio, piso, etc."
							placeholder="Grand Towers Apt 1001"
							color="pink lighten-2"
							></v-text-field>
							<v-text-field
							ref="zipcode"
							v-model="customerInfo.zipcode"
							type="tel"
							append-icon="person_pin_circle"
							label="Código Postal"
							color="pink lighten-2"
							placeholder="22031"
							mask="##### ####"
							:rules="[() => !!customerInfo.zipcode || 'Ingresa tu codigo postal o zip code.']"
							></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-layout column>
								<v-btn 
								color="pink lighten-2" 
								class="white--text" 
								block 
								@click="processOrder" 
								:loading="paying" 
								:disabled="paying || !customerInfo.address || !customerInfo.zipcode">
								ENVIAR ORDEN POR ${{totalCart}}
								</v-btn>
								<br>
								<v-layout row>
									<v-btn color="pink lighten-2" flat @click="e1 = 1">REGRESAR</v-btn>
									<v-btn color="pink lighten-2" flat @click="emprendedoraPagoDialog.show = false; e1 = 1">CANCELAR</v-btn>
								</v-layout>
							</v-layout>
						</v-card-actions>
					</v-card>
				</v-stepper-content>
				<v-stepper-content step="3">
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
							<div>Ahora es momento de contactar a {{ customer }}.</div>
						</v-card-text>
						<v-card-actions>
							<v-btn color="pink lighten-2" block flat @click="emprendedoraPagoDialog.show = false; e1 = 1">CERRAR</v-btn>
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
			customer: this.$auth.getUserName(),
			e1: 1,
			paying: false,
			customerInfo: {
				name: '',
				address: '',
				address2: '',
				mobilephone: '',
				zipcode: ''
			}
		}
	},
	methods: {
		processOrder() {
			this.paying = true
			this.$http.post(
				this.$apiURL + '/multivendor/process/order', 
				{ 
					octopux_token: 'f550a68b-21ff-4b33-aa04-bff68023acca', 
					cart_items: this.cartItems, 
					customer: this.$auth.getUser(), 
					customer_client: this.customerInfo,
					total: this.totalCart
				}
			).then(function(response) {
				this.e1 = 3
				this.paying = false
				this.customerInfo.name = ''
				this.customerInfo.address = ''
				this.customerInfo.address2 = ''
				this.customerInfo.mobilephone = ''
				this.customerInfo.zipcode = ''
				this.$store.commit('clearCart')
			}.bind(this)
			).catch(function(error) {
				this.paying = false
				this.notification.message = 'Fallo al enviar la orden (epd-po-00)',
				this.notification.show = true
			}.bind(this)
		)}
	},
	computed: {
		...mapGetters({
			emprendedoraPagoDialog: 'emprendedoraPagoDialog',
			totalCart: 'totalCart',
			cartItems: 'cartItems',
			notification: 'notification'
		}),
		isValid () {
			var validate = {
				name: this.customerInfo.name,
				mobilephone: this.customerInfo.mobilephone,
				address: this.customerInfo.address,
				zipcode: this.customerInfo.zipcode
			}
			var result = 0
			Object.keys(validate).forEach(f => {
				if (validate[f]) {
					result++
				}
			})
			return result
		}
	}
}
</script>
