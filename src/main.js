import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue';
import App from './App.vue';


import Router from './router';
import store from './store';


const app = createApp(App);

app.use(VueSweetalert2);
app.use(Router);
app.use(store);
app.mount('#app');