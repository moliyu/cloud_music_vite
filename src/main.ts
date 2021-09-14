import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import store from './store'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon.vue'

createApp(App)
  .use(router)
  .use(store)
  .component(SvgIcon.name, SvgIcon)
  .mount('#app')
