<template>
  <v-card class="mx-auto my-5" max-width="640" rounded="lg" variant="outlined">
    <v-card-item>
      <v-card-title>Joined Users</v-card-title>
    </v-card-item>
    <v-card-text>
      <div class="flex space-x-2">
        <v-chip 
          v-for="[clientId, value] in store.users" 
          :key="clientId" 
          variant="outlined"
        >
          {{ value.user.username }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

</script>
