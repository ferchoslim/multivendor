<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex xs12>
      <div v-if="catalogItems.length == 0" class="container fluid fill-height">
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <img src="../assets/loader.gif" />
          </v-flex>
        </v-layout>
      </div>
      <catalog-card
        v-for= "(catalogItem, index) in catalogItems"
        :key="index"
        :name = "catalogItem.name"
        :description = "catalogItem.description"
        :saleprice = "catalogItem.compareAtPrice || catalogItem.saleprice"
        :images = "catalogItem.images"
        :variants = "catalogItem.variants"
      ></catalog-card>
    </v-flex>
    <v-dialog v-model="itemOptionsDialog.open" max-width="500px">
      <v-card>
        <v-card-title>
          <div class="headline">Seleccione</div>
        </v-card-title>
        <v-card-text>
          <v-select
            color="pink lighten-2"
            v-if="itemOptionsDialog.size"
            v-model="dialog.selected"
            :items="itemOptionsDialog.sizes"
            item-text="text"
            item-value="value"
            return-object
            label="Talla"
            @change="sizeSelected"
          ></v-select>
          <br>
          <v-select
            color="pink lighten-2"
            v-model="dialog.quantity"
            :items="itemOptionsDialog.quantities"
            label="Cantidad"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="pink lighten-2" flat @click="itemOptionsDialogAdd" :disabled="dialog.quantity == ''">Agregar</v-btn>
          <v-btn color="pink lighten-2" flat @click="itemOptionsDialogClose">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'catalog',
  methods: {
    sizeSelected(size) {
      this.dialog.quantity = [];
      this.$store.commit('itemOptionsDialogQuantity', {
        quantity: size.value
      })
    },
    itemOptionsDialogClose() {
      this.$store.commit('itemOptionsDialog', {
        open: false
      })
      this.dialog.selected = {}
    },
    itemOptionsDialogAdd() {
      this.$store.commit('addToCart', {
        sku: this.dialog.selected.sku,
        name: this.itemOptionsDialog.name,
        saleprice: this.itemOptionsDialog.saleprice,
        size: this.dialog.selected.text,
        quantity: this.dialog.quantity,
        quantities: this.dialog.selected.value,
        image: this.itemOptionsDialog.image
      });
      this.$store.commit('itemOptionsDialog', {
        open: false
      });
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    }
  },
  mounted() {
    document.title = 'Tienda de ' + this.$auth.getUserName()
    if (this.catalogItems.length == 0) {
    this.$http.post(
      this.$apiURL + '/shopity/collection', 
      { octopux_token: process.env.VUE_APP_OCTOPUX_PUBLIC_TOKEN, collection_id: this.category }
    ).then(function(response) {
        this.$store.commit('catalogItems', response.data.catalogItems)
      }.bind(this)).catch(function(error) {
        this.notification.message = 'Fallo al cargar las los productos (cg-m-00)'
        this.notification.show = true
      }.bind(this));
    }
  },
  data() {
    return {
      dialog: {
        title: false,
        quantity: '',
        selected: {}
      }
    }
  },
  computed: mapGetters({
    category: 'category',
    itemOptionsDialog: 'itemOptionsDialog',
    catalogItems: 'catalogItems',
    notification: 'notification',
    cartItems: 'cartItems'
  }),
  components: {
    'catalog-card': Card
  }
}
</script>
