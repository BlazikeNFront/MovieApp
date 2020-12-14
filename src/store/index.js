import { createStore } from 'vuex';

import UserAuth from './Authentication/index.js'
import HeaderLayout from './HeaderLayout/HeaderLayout.js'

 const store = createStore({
    modules:{
        UserAuth,
        HeaderLayout,
    }
})

export default store;