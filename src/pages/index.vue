<template>
  <v-tabs-window v-model="store.tab">
    <v-tabs-window-item :value="tabs.home">
      <form-username />
      <form-room v-if="!!store.username" />
      <joined-user v-if="!!store.room" />
    </v-tabs-window-item>

    <v-tabs-window-item :value="tabs.chat">
      <chat />
    </v-tabs-window-item>
  </v-tabs-window>

</template>

<script lang="ts" setup>
  import Chat from '@/components/Chat.vue'
  import FormRoom from '@/components/FormRoom.vue'
  import FormUsername from '@/components/FormUsername.vue'
  import JoinedUser from '@/components/JoinedUser.vue'
  import { tabs, useAppStore } from '@/stores/app'

  const store = useAppStore()

</script>
