import { createStore } from 'vuex';

 import UserAuth from './Authentication/index.js'
 import HeaderLayout from './HeaderLayout/HeaderLayout.js'
 import StandardCarousels from './StandarCarousel/StandarCarousel.js'  

 const store = createStore({
    modules:{
         UserAuth,
         HeaderLayout,
        StandardCarousels,  
    }
})

export default store;