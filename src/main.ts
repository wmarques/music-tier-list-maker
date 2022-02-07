import './index.css'
import 'vue-select/dist/vue-select.css'
import {createApp} from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'

let app = createApp(App);
app.component('v-select', vSelect)
app.mount('#app')
