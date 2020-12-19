import { createRouter, createWebHistory } from 'vue-router';


import  MainPage  from './pages/MainPage.vue';
import  SearchResult  from './pages/SearchResult.vue';
import  DetailsView  from './pages/DetailsView.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MainPage },
        { path: '/searchResult', component: SearchResult },
        { path:'/show',component:DetailsView }
    ],
})

export default router