import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import MainPage from "./pages/MainPage.vue";

const UserSearchResult = () =>
  import(/* webpackChunkName: "homePage" */ "./pages/UserSearchResult.vue");

const NavSearchResult = () =>
  import(
    /* webpackChunkName: "NavSearchResult" */ "./pages/NavSearchResult.vue"
  );

const DetailViewMovie = () =>
  import(
    /* webpackChunkName: "DetailViewMovie" */ "./pages/DetailViews/DetaliViewMovie.vue"
  );

const DetailViewShow = () =>
  import(
    /* webpackChunkName: "DetailViewShow" */ "./pages/DetailViews/DetailViewShow.vue"
  );

const SignUpForm = () =>
  import(/* webpackChunkName: "SignUpForm" */ "./pages/SignUpFrom.vue");
const UserAuth = () =>
  import(/* webpackChunkName: "UserAuth" */ "./pages/userAuth.vue");

const UserAccountDetails = () =>
  import(
    /* webpackChunkName: "UserAccountDetails" */ "./pages/UserAccountDetails.vue"
  );

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage },
    { path: "/signUp", component: SignUpForm },
    { path: "/login", component: UserAuth },
    {
      path: "/UserAccountDetails",
      component: UserAccountDetails,
      beforeEnter(to, from, next) {
        if (!store.getters["UserAuth/isAuth"]) {
          next("/login");
        } else {
          next();
        }
      },
    },

    {
      name: "user-search-result",
      path: "/customSearch/:userQuery",
      component: UserSearchResult,
    },
    {
      name: "nav-search-result",
      path: "/searchResult/:typeOfSearch",
      component: NavSearchResult,
      props: true,
    },
    { path: "/movie/:movieID", component: DetailViewMovie },
    { path: "/tv/:showID", component: DetailViewShow },
  ],
});

export default router;
