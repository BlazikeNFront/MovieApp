import { createRouter, createWebHistory } from 'vue-router';


import  MainPage  from './pages/MainPage.vue';
import  SearchResult  from './pages/SearchResult.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/searchResult',component: SearchResult } ,
    ],
})

export default router