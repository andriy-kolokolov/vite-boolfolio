import {createApp} from 'vue';
import './scss/main.scss';
import App from './App.vue';
import 'bootstrap/scss/bootstrap.scss'; // Import the Bootstrap CSS
import 'bootstrap'; // Import Bootstrap's JavaScript (optional if you need tooltips, popovers, etc.)
import {router} from "./router.js";


createApp(App).use(router).mount('#app')
