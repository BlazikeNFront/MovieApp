import { createStore } from 'vuex';

import UserAuthModule from './Authentication/UserAuth.js'

 const store = createStore({
    modules:{
        userAuth:UserAuthModule,
    }
})

export default store;