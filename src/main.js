import { createApp } from 'vue'

import App from './App.vue'
import store from './store/index.js'
import router from './router.js'

//global components
import  BaseButton from './components/UI/BaseButton.vue'
import BaseCard from './components/UI/BaseCard.vue'
import StandardCarousel from './components/UI/StandardCarousel.vue'


const movieApp = createApp(App);

movieApp.use(store);
movieApp.use(router);



movieApp.component('base-button',BaseButton);
movieApp.component('base-card',BaseCard);
movieApp.component('standard-carousel',StandardCarousel);


movieApp.mount('#app');





