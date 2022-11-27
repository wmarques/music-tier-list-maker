import './index.css'
import 'vue-select/dist/vue-select.css'
import {createApp} from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import TierListPage from './components/TierListPage.vue'
import Home from './components/Home.vue'
import vSelect from 'vue-select'
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/tierlist', component: TierListPage },
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

let app = createApp(App);
app.use(router);
app.component('v-select', vSelect)
app.mount('#app')
