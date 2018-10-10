<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      width="250"
      dark
      class="pink lighten-2"
    >
    <!--<v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Menú
          </v-list-tile-title>
        </v-list-tile>
      </v-list>

            <v-badge left>
              <span slot="badge">{{ totalCartItems }}</span>
              </v-badge>


    </v-toolbar>-->

    <v-divider></v-divider>
      <v-list dense style="padding: 10px;">

        <v-list-tile to="/carrito">
          <v-list-tile-action>
              <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Carrito</v-list-tile-title>
          </v-list-tile-content>
          <v-chip color="blue" text-color="white" v-if="totalCartItems > 0">
            {{ totalCartItems }}
          </v-chip>
        </v-list-tile>

        <v-list-tile to="/catalogo">
          <v-list-tile-action>
            <v-icon>book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Catalogo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/categorias">
          <v-list-tile-action>
            <v-icon>view_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Categorías</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-spacer></v-spacer>

      <v-list>
        <v-list-tile @click.stop="drawer = !drawer">
          <v-list-tile-action>
            <v-icon>keyboard_backspace</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Regresar</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed flat dark color="pink lighten-2">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="this.$auth.isAuthenticated()"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{ this.$auth.getUserName() }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="this.$auth.isAuthenticated()" :href="'tel:' + this.$auth.getMobilePhone()">
        <v-icon>phone</v-icon>
      </v-btn>
      <v-btn icon v-if="this.$auth.isAuthenticated()" v-on:click="reload">
        <v-icon>close</v-icon>
      </v-btn>
      </v-toolbar>
    <v-content fluid>
      <router-view />
    </v-content>
    <!--<v-bottom-nav
    :active.sync="bottomNav"
    :value="true"
    app fixed flat dark color="pink lighten-2"
    >
      <v-btn
        flat
        value="cart"
        to="/carrito"
        color="white"
        v-if="totalCartItems > 0"
        :disabled="!this.$auth.isAuthenticated()"
      >
      <span>Carrito</span>
        <v-badge left>
          <span slot="badge">{{ totalCartItems }}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
      </v-btn>

      <v-btn
        flat
        value="cart"
        to="/carrito"
        color="white"
        v-else
        :disabled="!this.$auth.isAuthenticated()"
      >
        <span>Carrito</span>
        <v-icon>shopping_cart</v-icon>
      </v-btn>

      <v-btn
        flat
        value="catalog"
        to="/catalogo"
        color="white"
        :disabled="!this.$auth.isAuthenticated()"
      >
        <span>Catalogo</span>
        <v-icon>book</v-icon>
      </v-btn>

      <v-btn
        flat
        value="categories"
        to="/categorias"
        color="white"
        :disabled="!this.$auth.isAuthenticated()"
      >
        <span>Categorías</span>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-bottom-nav>-->
    
    <v-snackbar
    v-model="notification.show"
    right
    :timeout="notification.timeout"
    top
    >
      {{notification.message}}
      <!--<v-btn
          color="pink"
          flat
          @click="notification.show = false"
      >
      <v-icon>close</v-icon>
    </v-btn>-->
    </v-snackbar>
  </v-app>
</template>
<style>
.primary--text.v-list__tile--active.v-list__tile.v-list__tile--link.theme--dark {
  color: #F06292 !important;
  background-color: white !important;
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      drawer: false,
      bottomNav: 'catalog'
    }
  },
  mounted() {
    /*document.title = 'Tienda de ' + this.$auth.getUserName()
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
    }*/
  },
  methods: {
    reload() {
      localStorage.clear()
      this.$router.push('/')
      //location.reload()
    }
  },
  computed: {
    ...mapGetters({
      currentPage: 'currentPage',
      notification: 'notification',
      totalCartItems: 'totalCartItems'/*,
      catalogItems: 'catalogItems',
      category: 'category'*/
    })
  },
}
</script>
