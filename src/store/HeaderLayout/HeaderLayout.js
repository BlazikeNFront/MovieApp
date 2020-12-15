

const headerLayoutStore = {
    namespaced: true,
     
    state() {
        return {
            headerSearchState: false,
            navBarState: false,
            searchData: null,
        }
    },

    mutations: {
        toggleHeaderSearch(state) {
            state.headerSearchState = !state.headerSearchState
        },

        toggleNavBar(state) {
            state.navBarState = !state.navBarState;
        },
        updateSearchData(state, payload) {
            
            state.searchData = payload
            
        },
    },
        


     actions: {
         toggleHeaderSearch(context) {
             context.commit('toggleHeaderSearch')
         },
         toggleNavBar(context) {
             context.commit('toggleNavBar')
         },

         async updateSearchData(context,payload) {

                try {
                  const response = await fetch(
                    `https://api.themoviedb.org/3/search/multi?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&query=${payload}&page=1`
                  );
                  if (!response.ok) {
                    const error = "Server side error";
                    throw new Error(error);
                  }
                  const data = await response.json();
                    context.commit('updateSearchData', await data)  
                   
                } catch (err) {
                  console.log(err);
                }
                
                
              
         }
         
    }, 

    getters: {
        headerSearchState(state) {
            return state.headerSearchState
        },
        navBarState(state) {
            return state.navBarState
        },
        searchData(state) {
            return state.searchData
        }
        }
    }


    export default headerLayoutStore;