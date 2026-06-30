


// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import PrimeVue from 'primevue/config'
// import ToastService from 'primevue/toastservice'
// import Aura from '@primeuix/themes/aura'
// import ConfirmationService from 'primevue/confirmationservice'
// import Tooltip from 'primevue/tooltip'

// import App from './App.vue'
// import router from './router'
// import { useAuthStore } from './stores/auth'

// // PrimeVue styles
// import 'primevue/resources/themes/lara-light-blue/theme.css'
// import 'primevue/resources/primevue.min.css'
// import 'primeicons/primeicons.css'
// import './assets/main.css'

// async function bootstrap() {
//   const app = createApp(App)

//   const pinia = createPinia()
//   app.use(pinia)

//   // Initialize auth before router
//   const authStore = useAuthStore()
//   if (authStore.initializeAuth) {
//     await authStore.initializeAuth()
//   }

//   app.use(PrimeVue, {
//     theme: {
//         preset: Aura
//     }
// })

//   app.use(router)
//   app.use(ToastService)
//   app.use(ConfirmationService)
//   app.directive('tooltip', Tooltip)

//   app.mount('#app')
// }

// bootstrap()



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import 'primeicons/primeicons.css'
import './assets/main.css'

async function bootstrap() {
  const app = createApp(App)

  const pinia = createPinia()
  app.use(pinia)

  // Initialize auth before router
  const authStore = useAuthStore()
  if (authStore.initializeAuth) {
    await authStore.initializeAuth()
  }

  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })

  app.use(router)
  app.use(ToastService)
  app.use(ConfirmationService)

  app.directive('tooltip', Tooltip)

  app.mount('#app')
}

bootstrap()