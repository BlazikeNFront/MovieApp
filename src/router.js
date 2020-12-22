import { createRouter, createWebHistory } from 'vue-router';


import  MainPage  from './pages/MainPage.vue';
import  SearchResult  from './pages/SearchResult.vue';
import  DetailsView  from './pages/DetailsView.vue';
import  SignUpForm  from './pages/SignUpFrom.vue';
import  UserAuth  from './pages/userAuth.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/signUp', component: SignUpForm },
        { path: '/login', component: UserAuth },
        { path: '/searchResult', component: SearchResult },
        { path:'/show',component:DetailsView }
    ],
})

export default router