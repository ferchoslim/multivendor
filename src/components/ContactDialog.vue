<template>
	<v-dialog v-model="contactDialog.show" max-width="500px">
		<v-card>
			<v-card-title>
				<div class="headline">Información Personal</div>
			</v-card-title>
			<v-card-text>
				<v-text-field
				ref="name"
				v-model="contactInfo.name"
				type="text"
				append-icon="account_box"
				label="Nombre"
				placeholder="Maria Perez"
				color="pink lighten-2"
				:rules="[() => !!contactInfo.name || 'Ingresa tu nombre.']"
				></v-text-field>
				<v-text-field
				ref="mobilephone"
				v-model="contactInfo.mobilephone"
				type="tel"
				append-icon="phone"
				label="Telefono"
				color="pink lighten-2"
				mask="############"
				:rules="[() => !!contactInfo.mobilephone || 'Ingresa tu telefono.']"
				></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-flex xs12>
					<v-btn class="white--text" color="pink lighten-2" block large @click="sendAndCall" :loading="loading" :disabled="loading || !contactInfo.name || !contactInfo.mobilephone">QUIERO VER EL CATALOGO <br /> Y RECIBIR UNA LLAMADA</v-btn>
					<br>
					<v-btn color="pink lighten-2" flat block @click="contactDialog.show = false">CERRAR</v-btn>
				</v-flex>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			e1: 1,
			loading: false,
			contactInfo: {
				name: '',
				mobilephone: ''
			}
		}
	},
	methods: {
		sendAndCall() {
			this.loading = true
			this.$http.post(
				this.$apiURL + '/multivendor/process/contact', 
				{ 
					octopux_token: 'f550a68b-21ff-4b33-aa04-bff68023acca', 
					contact_info: this.contactInfo
				}
			).then(function(response) {
				this.loading = false
				this.contactDialog.show = false
				var customer = {}
				customer.internalid = 198999
				customer.altname = 'TISSINI'
				customer.entityid = '59723'
				customer.mobilephone = '8003410799'
				customer.salesrep = {
					entityid: 'Fernando Delgado',
					email: 'fernandod@tissini.com'
				}
				localStorage.setItem('customer', JSON.stringify(customer))
				this.$router.push('/catalogo')
			}.bind(this)).catch(function(error) {
				this.loading = false
				this.$store.commit('notification', {
					message: 'Fallo al conectar con el servidor (001)',
					show: true
				})
			}.bind(this))
		}
	},
	computed: {
		...mapGetters({
			contactDialog: 'contactDialog',
		}),
		isValid () {
			var validate = {
				firstname: this.contactInfo.firstname,
				lastname: this.contactInfo.lastname,
				mobilephone: this.contactInfo.mobilephone
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
