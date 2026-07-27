/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { enableVueBindings } from '@syncedstore/core'
// Composables
import { createApp } from 'vue'
// CRDT
import * as Vue from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
// Styles
import 'unfonts.css'
import './styles/tailwind.css'
import './styles/main.scss'

enableVueBindings(Vue)

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
