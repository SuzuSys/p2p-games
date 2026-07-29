<template>
  <v-app>
    <v-app-bar density="compact">
      <v-app-bar-title>P2P Games</v-app-bar-title>

      <template #append>
        <v-btn
          class="m-2"
          icon="mdi-theme-light-dark"
          @click="$vuetify.theme.cycle()"
        />
      </template>

      <template #extension>
        <v-tabs
          v-model="store.tab"
          align-tabs="title"
        >
          <v-tab v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
      <v-snackbar-queue v-model="store.snackbars" closable :timeout="3500" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { tabs, useAppStore } from '@/stores/app'

  const store = useAppStore()
</script>
