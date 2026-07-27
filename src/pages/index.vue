<template>
  <form-username />
  <form-room v-if="!!store.username" />
</template>

<script lang="ts" setup>
  import FormRoom from '@/components/FormRoom.vue'
  import FormUsername from '@/components/FormUsername.vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

</script>
