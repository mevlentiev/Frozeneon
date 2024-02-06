<template>
  <v-table class="fill-height">
    <thead>
    <tr>
      <th class="text-left">
        Name
      </th>
      <th class="text-left">
        Requests
      </th>
      <th class="text-left">
        Bandwidth
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in paginateSearchedPackages"
      :key="item.name"
      @click="openModal(item)"
    >
      <td>
        <v-skeleton-loader
          :loading="$store.state.loading"
          type="list-item"
        >
          {{ item.name }}
        </v-skeleton-loader>
      </td>
      <td>
        <v-skeleton-loader
          :loading="$store.state.loading"
          type="list-item"
        >
          {{ item.hits }}
        </v-skeleton-loader>
      </td>

      <td>
        <v-skeleton-loader
          :loading="$store.state.loading"
          type="list-item"
        >
          {{ item.bandwidth }} GB
        </v-skeleton-loader>
      </td>
    </tr>
    </tbody>
  </v-table>


  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card>
      <v-card-text>
        Type: {{ type }}
      </v-card-text>
      <v-card-text>
        Name: {{ name }}
      </v-card-text>
      <v-card-text>
        Self link: <a :href="self">{{ self }}</a>
      </v-card-text>
      <v-card-text>
        Version link: <a :href="versions">{{ versions }}</a>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";


export default defineComponent({
  // type inference enabled
  data() {
    return {
      dialog: false,
      type: '',
      name: '',
      self: '',
      versions: '',
    }
  },
  computed: {
    ...mapGetters({
      paginateSearchedPackages: 'paginateSearchedPackages'
    })
  },
  mounted() {
    this.fetchPackages()
  },

  methods: {
    ...mapActions({
      fetchPackages: 'fetchPackages',
    }),

    openModal (item) {
      this.type = item.type
      this.name = item.name
      this.self = item.links.self
      this.versions = item.links.versions
      this.dialog = true
    }
  }
})
</script>
