

const StandardCarousels = {
    namespaced: true,
    
    state() {
        return {
            trendingMovies:null,
            trendingTvShows:null,
        }
    },
    mutations: {
        updateTrendingMovies(state,payload) {
            state.trendingMovies = payload;
         
        },
        updateTrendingTvShows(state,payload) {
          state.trendingTvShows = payload;
         
        },
    },
    actions: {
      async  updateTrendingMovies(context) {
        try {
            const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=1");
            const dataJson = await data.json()
     
            
            if (!data.ok) {
              const error = "There was an error in response";
              throw new Error(error);
            }
            
            context.commit('updateTrendingMovies',dataJson)
          } catch (error) {
            console.log(error);
          }
        },

        async  updateTrendingTvShows(context) {
            try {                         
                const data = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=b9e62fadaa93179070f235a9087033e2&language=en-US&page=1");
               
                const dataJson = await data.json()
              
                if (!data.ok) {
                  const error = "There was an error in response";
                  throw new Error(error);
                }
                
                context.commit('updateTrendingTvShows', dataJson)
              } catch (e) {
                console.log(e);
              }
            },
    },


    getters: {

        trendingMovies(state) {
            return state.trendingMovies
        },
        

        trendingTvShows(state) {
            return state.trendingTvShows
        }
    },
}

export default StandardCarousels;