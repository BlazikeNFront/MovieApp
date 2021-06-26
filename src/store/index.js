import { createStore } from "vuex";
import ErrorModal from "./ErrorModal/Error.js";
import UserAuth from "./Authentication/Auth.js";
import HeaderLayout from "./HeaderLayout/HeaderLayout.js";
import StandardCarousels from "./StandarCarousel/StandarCarousel.js";
import ShowDetails from "./ShowDetails/ShowDeatils.js";

const store = createStore({
  modules: {
    ErrorModal,
    UserAuth,
    HeaderLayout,
    StandardCarousels,
    ShowDetails,
  },
});

export default store;
