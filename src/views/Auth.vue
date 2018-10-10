<template>
	<v-layout justify-center column fill-height>
		<v-flex xs12>
			<v-card>
				<v-card-title>
					<h3>Ingresa el número de teléfono de tu asesora independiente Tissini.</h3>    
				</v-card-title>
				<v-card-text>
					<v-form v-model="valid">
						<v-text-field
						v-model="mobilephone"
						label="Telefono"
						mask="############"
						required
						color="pink lighten-2"
						type="tel"
						:rules="[() => !!mobilephone || 'Ingresa Numero de telefono de tu asesora.']"
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-layout align-center>
						<v-flex xs12 sm4 text-xs-center>
							<div>
							<v-btn
							block
							class="white--text"
							color="pink lighten-2"
							@click="goToCatalog"
							:loading="loading"
							:disabled="loading || !valid"
							>
									VER CATALOGO
							</v-btn>
							<br>
							</div>
							<div>
							<v-btn
							block
							dark
							color="pink lighten-2"
							@click="contactDialog.show = true"
							flat
							v-if="noTengoEmprendedora"
							>
									NO TENGO ASESORA
							</v-btn>
							</div>
						</v-flex>
					</v-layout>
				</v-card-actions>
			</v-card>
		</v-flex>
		<contact-dialog></contact-dialog>
		<v-snackbar
    v-model="notification.show"
    right
    :timeout="notification.timeout"
    top
    >
      {{notification.message}}
      <v-btn
          color="pink"
          flat
          @click="notification.show = false"
      >
      <v-icon>close</v-icon>
    </v-btn>
    </v-snackbar>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactDialog from '@/components/ContactDialog.vue'

export default {
	mounted() {
		if (this.$route.params.mobilephone) {
			this.mobilephone = this.$route.params.mobilephone
			this.goToCatalog()
		}
		this.$http.post('http://www.geoplugin.net/json.gp')
		.then(function(response) {
			if (response.data.geoplugin_countryCode === 'US') {
				this.noTengoEmprendedora = true
			}
		}.bind(this))
		.catch(function(error) {
			/*this.notification.message = 'Fallo al obtener informacion del cliente (a-md-00)'
			this.notification.show = true*/
		}.bind(this));
	},
	methods: {
		goToCatalog() {
			this.loading = true
			this.$http.post(
				this.$apiURL + '/customer', 
				{ 
					octopux_token: 'f550a68b-21ff-4b33-aa04-bff68023acca', 
					mobilephone: this.mobilephone 
				}
			).then(function(response) {
				var customer = response.data
				localStorage.setItem('customer', JSON.stringify(customer))
				this.$router.push('/categorias')
			}.bind(this)).catch(function(error) {
				this.loading = false
				/*this.notification.message = 'Fallo al obtener informacion del cliente (a-md-01)'
				this.notification.show = true*/
			}.bind(this))
		}
	},
	data () { 
		return {
			noTengoEmprendedora: false,
			loading: false,
			valid: false,
			mobilephone: ''
		}
	},
	components: {
		'contact-dialog': ContactDialog
	},
	computed: {
		...mapGetters({
			contactDialog: 'contactDialog',
			notification: 'notification'
		})
	}
}
</script>
