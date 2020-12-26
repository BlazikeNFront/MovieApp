import { createApp } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faStar)

import App from './App.vue'
import store from './store/index.js'
import router from './router.js'

//global components
import  BaseButton from './components/UI/BaseButton.vue'
import BaseCard from './components/UI/BaseCard.vue'
import StandardCarousel from './components/UI/StandardCarousel.vue'
import Spinner from './components/UI/Spinner.vue'

const movieApp = createApp(App);

movieApp.use(store);
movieApp.use(router);



movieApp.component('base-button',BaseButton);
movieApp.component('base-card',BaseCard);
movieApp.component('standard-carousel', StandardCarousel);
movieApp.component('spinner', Spinner);
movieApp.component('font-awesome-icon', FontAwesomeIcon);



movieApp.mount('#app');





