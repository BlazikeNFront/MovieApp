import { createStore } from 'vuex';

import UserAuthModule from './Authentication/index.js'

 const store = createStore({
    modules:{
        userAuth:UserAuthModule,
    }
})

export default store;