
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
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.tokenExpiration = null;
        }
    },

    actions: {
       async signUp(context, payload) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS_XL-QBuPajQnPI7padxk-fwVMb9U14A', {
                    method: "POST",
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                        userName: payload.userName
                    })
                })
                
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.error.message || 'failed to sign up')
                    
                }
                context.commit('setUser', {
                    token: responseData.idToken,
                    userId: responseData.localId,
                    tokenExpiration: responseData.expiresIn,
                    
                })
               
            } catch (err) {
              
                throw new Error(err)
                
            }
            
            
        },



        async signIn(context, payload) {
          try { const response =  await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS_XL-QBuPajQnPI7padxk-fwVMb9U14A',{
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
                  
                const error = new Error(responseData.error.message)
                throw error
                   
               }
             
               context.commit('setUser', {
                   token: responseData.idToken,
                   userId: responseData.localId,
                   tokenExpiration: responseData.expiresIn,
                   
               })
          } catch(err){
              
              throw new Error(err)
               }
        },
        
        logout(context) {
            context.commit('logout')

        }


    },

    getters:{
        isAuth(state) {
            console.log(state.userId)
            return !!state.userId
        }
    },
    
}