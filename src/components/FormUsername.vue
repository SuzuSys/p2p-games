<template>
  <v-card class="mx-auto my-5" max-width="640" rounded="lg" variant="outlined">
    <v-card-text>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="username.value.value"
          :counter="USERNAME_MAX"
          density="compact"
          :error-messages="username.errorMessage.value"
          hide-details="auto"
          label="Username"
          variant="outlined"
        >
          <template #append>
            <v-btn
              color="primary"
              :disabled="!meta.valid || isSubmitting"
              min-height="40"
              type="submit"
              variant="outlined"
            >
              Submit
            </v-btn>
          </template>
        </v-text-field>
      </form>

      <div v-if="!!store.username">
        Your name is: {{ store.username }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { useField, useForm } from 'vee-validate'
  import { z } from 'zod'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  const USERNAME_MAX = 8

  const { meta, isSubmitting, handleSubmit } = useForm({
    validationSchema: toTypedSchema(z.object({
      username: z.string().trim().min(1, 'Required.').max(USERNAME_MAX, `Username must be at most ${USERNAME_MAX} characters.`),
    })),
  })

  const username = useField('username')

  const submit = handleSubmit(values => {
    store.username = values.username
  })

</script>
