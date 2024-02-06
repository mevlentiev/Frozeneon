<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="$store.state.page"
              @click="setPage($store.state.page)"
              class="my-4"
              :length="$store.state.totalPages"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";


export default defineComponent({
  // type inference enabled
  computed: {
    ...mapState({
      page: state => state.page,
    })
  },
  methods: {
    ...mapActions({
      fetchPackages: 'fetchPackages',
    }),
    setPage(page: number) {
      this.$store.commit('setPage', page)
    }
  },
  watch: {
    page() {
      if (this.$store.state.searchQuery === '') {
        this.fetchPackages()
      }
    }
  }
})
</script>
