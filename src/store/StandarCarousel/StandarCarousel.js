import { movieDBAPIKey } from "../../../privates.js";

export default {
  namespaced: true,

  state() {
    return {
      trendingMovies: null,
      trendingTvShows: null,
    };
  },
  mutations: {
    updateTrendingMovies(state, payload) {
      state.trendingMovies = payload;
    },
    updateTrendingTvShows(state, payload) {
      state.trendingTvShows = payload;
    },
  },
  actions: {
    async updateTrendingMovies(context) {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${movieDBAPIKey}&language=en-US&page=1`
        );
        const dataJson = await data.json();

        if (!data.ok) {
          const error = "There was an error in response";
          throw new Error(error);
        }

        context.commit("updateTrendingMovies", dataJson);
      } catch (err) {
        console.log(err);
      }
    },

    async updateTrendingTvShows(context) {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${movieDBAPIKey}&language=en-US&page=1`
        );

        const dataJson = await data.json();

        if (!data.ok) {
          const error = "There was an error in response";
          throw new Error(error);
        }

        context.commit("updateTrendingTvShows", dataJson);
      } catch (err) {
        console.log(err);
      }
    },
  },

  getters: {
    trendingMovies(state) {
      return state.trendingMovies;
    },

    trendingTvShows(state) {
      return state.trendingTvShows;
    },
  },
};
