import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./pages/MainPage.vue";
import SearchResult from "./pages/SearchResult.vue";

import DetailViewMovie from "./pages/DetailViews/DetaliViewMovie.vue";
import DetailViewShow from "./pages/DetailViews/DetailViewShow.vue";
import SignUpForm from "./pages/SignUpFrom.vue";
import UserAuth from "./pages/userAuth.vue";
import UserAccountDetails from "./pages/UserAccountDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/signUp", component: SignUpForm },
    { path: "/login", component: UserAuth },
    { path: "/UserAccountDetails", component: UserAccountDetails },
    {
      name: "search-result",
      path: "/searchResult/:userQuery",
      component: SearchResult,
    },
    { path: "/movie/:movieID", component: DetailViewMovie },
    { path: "/tv/:showID", component: DetailViewShow },
  ],
});

export default router;
