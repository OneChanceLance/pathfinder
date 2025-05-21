import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })
