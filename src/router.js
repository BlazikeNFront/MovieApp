import { createRouter, createWebHistory } from 'vue-router';


import  MainPage  from './pages/MainPage.vue';
import  SearchResult  from './pages/SearchResult.vue';

import DetailViewMovie from './components/UI/DetaliViewMovie.vue'
import DetailViewShow from './components/UI/DetailViewShow.vue'
import  SignUpForm  from './pages/SignUpFrom.vue';
import  UserAuth  from './pages/userAuth.vue';
import  UserAccountDetails  from './pages/UserAccountDetails.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/signUp', component: SignUpForm },
        { path: '/login', component: UserAuth },
        { path: '/UserAccountDetails', component: UserAccountDetails },
        { path: '/searchResult', component: SearchResult },
        { path: '/movie/:movieID', component: DetailViewMovie },
        { path:'/show/:showID',component:DetailViewShow}
       
    ],
})

export default router