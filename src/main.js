import { createApp } from 'vue'

import App from './App.vue'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

// eslint-disable-next-line quotes
import { setupRouter } from "./routes"

const app = createApp(App)

// Install ElementPlus plugin
app.use(ElementPlus)

setupRouter(app)

app.mount('#app')
