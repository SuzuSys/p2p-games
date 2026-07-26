<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title>P2P Games</v-app-bar-title>
      <template v-slot:append>
        <v-btn
          class="m-2"
          icon="mdi-theme-light-dark"
          @click="$vuetify.theme.cycle()"
        />
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
