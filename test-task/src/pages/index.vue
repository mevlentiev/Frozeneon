<template>
  <v-container>
    <Search />
    <PackageList />
    <Pagination />
    <Footer />
  </v-container>
</template>

<script lang="ts" setup>
  import Footer from "@/components/Footer.vue";
  import Search from "@/components/Search.vue";
  import PackageList from "@/components/PackageList.vue";
  import Pagination from "@/components/Pagination.vue";
</script>
