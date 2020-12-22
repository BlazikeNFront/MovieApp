
export default {
    state(){
        return {
          
            userId: null,
            token: null,
            tokenExpiration:null,
        }
    },

    mutations: {
        setUser(state,payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
        }
    },

    actions: {
       async signUp(context, payload) {
         const response =  await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS_XL-QBuPajQnPI7padxk-fwVMb9U14A',{
                method:"POST",
                body: JSON.stringify({
                    email:payload.email,
                    password:payload.password,
                    returnSecureToken: true,
                    userName:payload.userName
                })
         })
            
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'failed to sign up')
                throw error
            }
            console.log(responseData)
            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn,
                
            })
        }
    },

    getters:{

    },
    
}