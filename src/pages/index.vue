<template>
  <form-username />
  <form-room v-if="!!store.username" />
  <joined-user v-if="!!store.room" />
  <v-snackbar-queue v-model="store.snackbars" closable :timeout="3500" />
</template>

<script lang="ts" setup>
  import FormRoom from '@/components/FormRoom.vue'
  import FormUsername from '@/components/FormUsername.vue'
  import JoinedUser from '@/components/JoinedUser.vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

</script>
