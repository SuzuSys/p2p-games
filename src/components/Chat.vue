<template>
  <v-card class="mx-auto my-5" max-width="640" rounded="lg" variant="outlined">
    <v-card-text class="space-y-2">
      <message
        v-for="msg in store.room?.store.chats"
        :key="String(msg.from) + msg.message"
        :from="msg.from"
        :message="msg.message"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'
  import Message from './Message.vue'
  const store = useAppStore()

</script>
