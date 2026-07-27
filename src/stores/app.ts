import type { Awareness } from 'y-protocols/awareness'
import type { Doc } from 'yjs'
import { getYjsDoc, syncedStore } from '@syncedstore/core'
// Utilities
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { WebrtcProvider } from 'y-webrtc'

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

export const useAppStore = defineStore('app', () => {
  const username = ref('')
  const room: Ref<RoomStore | undefined> = ref()

  const createRoom = (roomId: string, password: string) => {
    const store = syncedStore({
      todos: [],
    })
    const yDoc = getYjsDoc(store)

    const provider = new WebrtcProvider(roomId, yDoc, {
      password,
      signaling: [import.meta.env.VITE_SIGNALING],
    })

    const awareness = provider.awareness

    awareness.setLocalStateField('user', {
      username: username.value,
    })

    console.log(awareness.getStates().values())

    awareness.on('change', () => {
      console.log(awareness.getStates().values())
    })

    room.value = {
      roomId, password, store, yDoc, provider, awareness,
    }
  }

  const disconnectRoom = () => {
    room.value?.provider.destroy()
    room.value = undefined
  }

  return { username, room, createRoom, disconnectRoom }
})
