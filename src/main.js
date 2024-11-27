import { createApp } from 'vue';
import './style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'material-icons/iconfont/material-icons.css';
import MaterialIcon from './components/MaterialIcon.vue';
import Tres from '@tresjs/core';
import App from './App.vue';

export const app = createApp(App);
app.component('MaterialIcon', MaterialIcon);
app.use(Tres);
app.mount('#app');
