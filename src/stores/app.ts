import type { ColorType } from '@/plugins/vuetify'
import type { Awareness } from 'y-protocols/awareness'
import type { Doc } from 'yjs'
import { getYjsDoc, syncedStore } from '@syncedstore/core'
// Utilities
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { WebrtcProvider } from 'y-webrtc'
import { z } from 'zod'

interface Todo {
  completed: boolean
  title: string
}

interface RoomStore {
  roomId: string
  password: string
  store: ReturnType<typeof syncedStore<{
    todos: Todo[]
  }>>
  yDoc: Doc
  provider: WebrtcProvider
  awareness: Awareness
}

interface Snackbar {
  text: string
  color: ColorType
}

const awarenessLocalStateSchema = z.object({
  username: z.string(),
})

const awarenessStatusSchema = z.map(
  z.number(),
  z.object({
    user: awarenessLocalStateSchema,
  }),
)

export const useAppStore = defineStore('app', () => {
  const username = ref('')
  const room: Ref<RoomStore | undefined> = ref()
  const snackbars: Ref<Snackbar[]> = ref([])
  const users: Ref<z.infer<typeof awarenessStatusSchema>> = ref(new Map())

  const createRoom = (roomId: string, password: string) => {
    const store = syncedStore({
      todos: [],
    })
    const yDoc = getYjsDoc(store)

    const provider = new WebrtcProvider(roomId, yDoc, {
      password,
      signaling: [import.meta.env.VITE_SIGNALING],
    })

    provider.on('synced', _ => snackbars.value.push({
      text: 'Synced!',
      color: 'success',
    }))

    const awareness = provider.awareness

    awareness.setLocalStateField('user', {
      username: username.value,
    } as z.infer<typeof awarenessLocalStateSchema>)

    users.value = awarenessStatusSchema.parse(awareness.getStates())

    awareness.on('change', () => {
      users.value = awarenessStatusSchema.parse(awareness.getStates())
    })

    room.value = {
      roomId, password, store, yDoc, provider, awareness,
    }
  }

  const changeUsername = (name: string) => {
    username.value = name
    room.value?.awareness.setLocalStateField('user', {
      username: name,
    } as z.infer<typeof awarenessLocalStateSchema>)
  }

  const disconnectRoom = () => {
    room.value?.provider.destroy()
    room.value = undefined
  }

  return { username, users, room, snackbars, createRoom, changeUsername, disconnectRoom }
})
