<template>
  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>


      <v-btn
        class="mx-4"
        href="https://github.com/mevlentiev/frozeneon"
        target="_blank"
        icon="mdi-github"
        variant="plain"
        size="medium"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Mykhailo Yevlentiev</strong>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>

//
</script>
