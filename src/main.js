import { createApp } from 'vue';
import './style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import Tres from '@tresjs/core';
import App from './App.vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const myClient = new QueryClient();

export const app = createApp(App);
app.use(VueQueryPlugin, { queryClient: myClient });
app.use(Tres);
app.mount('#app');
