import { createStore } from "vuex";

import UserAuth from "./Authentication/Auth.js";
import HeaderLayout from "./HeaderLayout/HeaderLayout.js";
import StandardCarousels from "./StandarCarousel/StandarCarousel.js";
import ShowDetails from "./ShowDetails/ShowDeatils.js";

const store = createStore({
  modules: {
    UserAuth,
    HeaderLayout,
    StandardCarousels,
    ShowDetails,
  },
});

export default store;
