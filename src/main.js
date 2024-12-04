import { createApp } from 'vue';
import './style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'material-icons/iconfont/material-icons.css';
import Tres from '@tresjs/core';
import App from './App.vue';

export const app = createApp(App);
app.use(Tres);
app.mount('#app');
