



const showDetails = {
    namespaced: true,
    state() {
        return {
            showInformations: null,
            
            showRate:false,
        }
    },
    mutations: {
        updateShowInformations(state, payload) {
          
            state.showInformations = payload
        },

        updateShowRate(state, payload) {
            state.showRate = payload
        }
    },
    actions: {
        async updateShowInformations(context, payload) {
            if (payload === null) {
                context.commit('updateShowInformations', payload);
        return    }
            let url = `https://api.themoviedb.org/3/movie/${payload.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`;
            if (!payload.movie) {
                url = `https://api.themoviedb.org/3/tv/${payload.id}?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US`
            }
       
            try {
                const data = await fetch(url);
                if (!data.ok) {
                    const error = "Server side error";
                    throw new Error(error);
                  }
                const dataJson = await data.json();
  
                context.commit('updateShowInformations', await dataJson);
                
           
               
            } catch(e) {
                console.log(e)
            }

        },
        
        
    },
    getters: {
        showInformations(state){
            return state.showInformations
        }
    },




}
export default showDetails