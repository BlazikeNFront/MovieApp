
export default {
    state(){
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            email: null,
            userName:null,
        }
    },

    mutations: {
        setUser(state,payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
            state.email = payload.userEmail
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.tokenExpiration = null;
            state.email = null;
            state.userName = null;
        },
        setUserName(state,payload){
            state.userName = payload
            
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
                       
                   })

                 
            })
              const userNameData = await fetch(`https://movieapp-9f058-default-rtdb.firebaseio.com/hmj8LQ9skrOZCjofzwzab42FnjX2/userName.json`);
              const responseUserNameData = await userNameData.json();
              
              const responseData = await response.json();
              
              if (!response.ok || !userNameData.ok) {
                  
                const error = new Error(responseData.error.message)
                throw error
                   
               }
             
               context.commit('setUser', {
                   token: responseData.idToken,
                   userId: responseData.localId,
                   tokenExpiration: responseData.expiresIn,
                   userEmail:responseData.email
                   
               })
              context.commit('setUserName',responseUserNameData)
             
          } catch(err){
              
              throw new Error(err)
               }
        },


        async setUserName(context, payload) {
            const userName = JSON.stringify(payload.userName)
            const response = await fetch(`https://movieapp-9f058-default-rtdb.firebaseio.com/${payload.userID}/userName.json`,
        {
          method: "PUT",
          body: userName,
                })
            
            if (!response.ok) {
                console.log('ERROR IN RESPONSE DATA IN setUserName action')
                
            }

             context.commit('setUserName',payload.userName)
            
       },
        
        logout(context) {
            context.commit('logout')

        }


    },

    getters:{
        isAuth(state) {
           
            return !!state.userId
        },

        userId(state) {
            
            return state.userId
        },

        userEmail(state) { 
            
            return state.email
        },

        userName(state) {
            return state.userName
        }

    },
    
}