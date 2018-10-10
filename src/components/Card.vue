<template>
	<v-flex xs12>
		<v-card style="margin-top: 20px;" :width="innerWidth + 'px'">
			<v-carousel :cycle="false" v-if="images.length > 1">
				<v-carousel-item
				v-for="(image, index) in images"
				:key="index"
				>
				<v-img
				:src="image"
				:lazy-src="image"
				transition="fade-transition"
				contain
				aspect-ratio="1"
				>
				<!--<v-card-title v-if="index == 0">
					<h2>{{name}}</h2>
				</v-card-title>-->
				</v-img>
				</v-carousel-item>
			</v-carousel>
			<v-img
			:src="images[0]"
			:lazy-src="images[0]"
			transition="fade-transition"
			contain
			aspect-ratio="1"
			v-else
			>
			<!--<v-card-title>
				<h2>{{name}}</h2>
			</v-card-title>-->
			</v-img>
			<v-card-text>
				<h3>{{name}}</h3>
			</v-card-text>
			<v-card-actions>
				<v-layout align-content-space-between>
					<!--<v-btn flat icon v-on:click="favoriteOnClick">
						<v-icon v-if="!item.favorite">favorite_border</v-icon>
						<v-icon v-else color="red" class="animated bounceIn">favorite</v-icon>
					</v-btn>-->
					<v-btn outline color="pink lighten-2" v-on:click="addToCart">
						AGREGAR
						<v-icon right>add_shopping_cart</v-icon>
					</v-btn>
					<v-spacer></v-spacer>
					<span class="blue--black title">${{saleprice}}</span>
				</v-layout>
			</v-card-actions>
		</v-card>
	</v-flex>
</template>
<style>
.v-carousel {
	height: 350px !important;
  box-shadow: 0 0px 0px 0px rgb(255,255,255), 0 0px 0px 0 rgb(255,255,255), 0 0px 0px 0 rgb(255,255,255);
}
.v-carousel .v-btn .v-icon {
  color: rgba(0, 0, 0, 0.4);
}
.v-carousel .v-carousel__controls {
  background-color: transparent;
}
.v-carousel .v-carousel__controls .v-btn .v-icon {
  color: rgb(88, 157, 248);
  font-size: 12px !important;
}
</style>
<script>
export default {
	props: ['name', 'description', 'saleprice', 'favorite', 'images', 'variants'],
	data() {
		return {
			innerWidth: (window.innerWidth < 360) ? window.innerWidth : 360,
			item: {
				name: this.name,
				saleprice: this.saleprice,
				sizes: [],
				image: this.images[0]
			}
		}
	},
	mounted() {
		this.variants.forEach(function(variant) {
			this.item.sizes.push({ text: variant.size, value: variant.quantityOnHand, sku: variant.sku })
		}.bind(this))
	},
	methods: {
		addToCart() {
			this.$store.commit('itemOptionsDialog', {
				open: true,
				sizes: this.item.sizes,
				image: this.item.image,
				name: this.item.name,
				saleprice: this.item.saleprice
			})
		}
	}
}
</script>
