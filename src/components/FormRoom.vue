<template>
  <v-card class="mx-auto my-5" max-width="640" rounded="lg" variant="outlined">
    <v-card-text>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="roomId.value.value"
          class="monospace-field"
          :counter="ROOMID_MAX"
          density="compact"
          :disabled="!!store.room"
          :error-messages="roomId.errorMessage.value"
          hide-details="auto"
          label="Room ID"
          variant="outlined"
        />

        <v-text-field
          v-model="password.value.value"
          :append-inner-icon="visiblePass ? 'mdi-eye-off' : 'mdi-eye'"
          class="monospace-field"
          :counter="PASSWORD_MAX"
          density="compact"
          :disabled="!!store.room"
          :error-messages="password.errorMessage.value"
          hide-details="auto"
          label="Password"
          :type="visiblePass ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="visiblePass = !visiblePass"
        />

        <v-row class="justify-end space-x-4" no-gutters>
          <v-col sm="auto">
            <v-btn
              block
              class="mr-4"
              color="error"
              :disabled="!store.room"
              variant="outlined"
              @click="store.disconnectRoom"
            >
              Disconnect
            </v-btn>
          </v-col>

          <v-col sm="auto">
            <v-btn
              block
              color="primary"
              :disabled="!meta.valid || isSubmitting || !!store.room"
              type="submit"
              variant="outlined"
            >
              Create / Join
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { toTypedSchema } from '@vee-validate/zod'
  import { useField, useForm } from 'vee-validate'
  import { ref } from 'vue'
  import { z } from 'zod'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  const visiblePass = ref(false)

  const ROOMID_MIN = 3
  const ROOMID_MAX = 16
  const PASSWORD_MAX = 32

  const { meta, isSubmitting, handleSubmit } = useForm({
    validationSchema: toTypedSchema(z.object({
      roomId: z
        .string()
        .trim()
        .min(ROOMID_MIN, `Room ID must be at least ${ROOMID_MIN} characters.`)
        .max(ROOMID_MAX, `Room ID must be at most ${ROOMID_MAX} characters.`)
        .regex(
          /^[\w-]+$/,
          'Room ID may only contain letters, numbers, underscores (_), and hyphens (-).',
        ),
      password: z
        .string()
        .min(1, 'Required.')
        .max(PASSWORD_MAX, `Password must be at most ${PASSWORD_MAX} characters.`),
    })),
  })

  const roomId = useField('roomId')
  const password = useField('password')

  const submit = handleSubmit(values => {
    store.createRoom(values.roomId, values.password)
    store.room?.provider.on('status', value => console.log(value))
    store.room?.provider.on('synced', value => console.log(value))
    store.room?.provider.on('peers', value => console.log(value))
    store.room?.provider.awareness.setLocalStateField('user', {
      username: store.username,
    })
  })

</script>

<style lang="scss" scoped>
.monospace-field {
  :deep(.v-field__input) {
    font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    font-variant-numeric: tabular-nums;
  }
}
</style>
