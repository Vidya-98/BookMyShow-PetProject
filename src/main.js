import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
require('../src/css/main.css')


const pinia = createPinia();

//app.use(pinia);

createApp(App).use(router).use(pinia).mount('#app')



