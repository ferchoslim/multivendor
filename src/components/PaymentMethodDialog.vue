<template>
	<v-dialog v-model="paymentMethodDialog.show" max-width="500px">
		<v-card>
			<v-card-title>
				<div class="headline">Metodo de pago</div>
			</v-card-title>
			<v-card-actions>
				<v-layout column>
					<v-btn class="white--text" color="pink lighten-2" block @click="checkoutDialog.show = true; paymentMethodDialog.show = false">
						TARJETA DE CREDITO
						<v-icon right>payment</v-icon>
					</v-btn>
					<br>
					<v-btn color="pink lighten-2" outline block @click="emprendedoraPagoDialog.show = true; paymentMethodDialog.show = false">
						PAGAR EN EFECTIVO
						<v-icon right>account_box</v-icon>
					</v-btn>
				</v-layout>
			</v-card-actions>
			<v-card-actions>
				<v-btn color="pink lighten-2" flat @click="paymentMethodDialog.show = false">
					CERRAR
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters({
			paymentMethodDialog: 'paymentMethodDialog',
			emprendedoraPagoDialog: 'emprendedoraPagoDialog',
			checkoutDialog: 'checkoutDialog'
		})
	}
}
</script>
