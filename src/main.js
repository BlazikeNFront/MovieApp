import { createApp } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faStar);

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router.js";

//global components

import BaseCard from "./components/UI/Common/BaseCard.vue";
import StandardCarousel from "./components/UI/MainPage/StandardCarousel.vue";
import Spinner from "./components/UI/Common/Spinner.vue";
import RateForm from "./components/UI/Common/RateForm.vue";

const movieApp = createApp(App);

movieApp.use(store);
movieApp.use(router);

movieApp.component("base-card", BaseCard);
movieApp.component("standard-carousel", StandardCarousel);
movieApp.component("spinner", Spinner);
movieApp.component("font-awesome-icon", FontAwesomeIcon);
movieApp.component("rate-form", RateForm);

movieApp.mount("#app");
