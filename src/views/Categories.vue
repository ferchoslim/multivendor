<template>
	<v-layout>
		<v-flex xs12>
			<v-card v-for="(category, index) in categories" :key="index" @click="selectCategory(category.collection_id)" style="margin-top: 20px;" @click.native="selectCategory(category.collection_id)">
				 <v-img
          :src="'img/categories/' + category.collection_id + '.jpg'"
        >
				</v-img>
				<!--<v-card-text>
					{{ category.name }}
				</v-card-text>-->
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	methods: {
		selectCategory(collectionId) {
			this.$store.commit('catalogItems', [])
			this.$store.commit('selectCategory', collectionId)
			this.$router.push('/')
		}
	},
	computed: mapGetters({
		categories: 'categories'
	})
}
</script>