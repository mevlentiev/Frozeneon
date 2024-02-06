<template>
  <v-text-field
    v-model.lazy.trim="searchQuery"
    @change="updateSearch"
    validate-on="lazy"
    label="Search"
    variant="solo"></v-text-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";


export default defineComponent({
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    ...mapActions({
      fetchSearchingPackages: 'fetchSearchingPackages',
      fetchPackages: 'fetchPackages',
    }),

    updateSearch() {
      this.searchQuery = this.searchQuery.trim();

      if (this.searchQuery !== '') {
        this.fetchSearchingPackages()
      } else {
        this.fetchPackages()
      }

      this.$store.commit('setSearchQuery', this.searchQuery)
    }
  },

  // watch: {
  //   searchQuery() {
  //     console.log(this.searchQuery)
  //   }
  // }
})
</script>

