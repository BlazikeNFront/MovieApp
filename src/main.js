import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'


//global components
import  BaseButton from './components/UI/BaseButton.vue'
import BaseCard from './components/UI/BaseCard.vue'

const movieApp = createApp(App);

movieApp.use(store);
movieApp.component('base-button',BaseButton);
movieApp.component('base-card',BaseCard);

movieApp.mount('#app');





