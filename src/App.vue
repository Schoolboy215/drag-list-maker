<template>
  <v-app>
    <v-main>
      <DragList />
    </v-main>
    <v-btn
      class="ma-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app>
</template>

<script lang="ts" setup>
  import DragList from '@/components/DragList.vue'
</script>
