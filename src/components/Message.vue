<template>
  <v-row class="justify-first" no-gutters>
    <v-col class="mb-1" cols="auto">
      <v-chip
        density="compact"
        variant="outlined"
      >
        {{ fromName }}
      </v-chip>
    </v-col>

    <v-col class="content-center ml-2 mb-1" cols="auto">
      {{ message }}
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useAppStore } from '@/stores/app'

  const { from, message } = defineProps({
    from: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  })

  const store = useAppStore()

  const fromName = computed(() => store.users.get(from) || 'Left user')

</script>
