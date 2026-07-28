<template>
  <form-username />
  <form-room v-if="!!store.username" />
  <v-snackbar-queue v-model="store.snackbars" closable :timeout="3500" />
</template>

<script lang="ts" setup>
  import FormRoom from '@/components/FormRoom.vue'
  import FormUsername from '@/components/FormUsername.vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

</script>
