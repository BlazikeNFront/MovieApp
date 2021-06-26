import { movieDBAPIKey } from "../../../privates.js";
export default {
  namespaced: true,
  state() {
    return {
      showInformations: null,

      showRate: false,
    };
  },
  mutations: {
    updateShowInformations(state, payload) {
      state.showInformations = payload;
    },

    updateShowRate(state, payload) {
      state.showRate = payload;
    },
  },
  actions: {
    async updateShowInformations(context, payload) {
      if (payload === null) {
        context.commit("updateShowInformations", payload);
        return;
      }
      const { typeOfShow, id } = payload;
      const url = `https://api.themoviedb.org/3/${typeOfShow}/${id}?api_key=${movieDBAPIKey}`;
      try {
        const data = await fetch(url);
        if (!data.ok) {
          const error = "Server side error";
          throw new Error(error);
        }
        const dataJson = await data.json();

        context.commit("updateShowInformations", await dataJson);
      } catch (e) {
        context.dispatch(
          "ErrorModal/setErrorMessage",
          "Error occured while searching database :(. Try again later",
          { root: true }
        );
        context.dispatch("ErrorModal/toggleErrorModal", "", {
          root: true,
        });
      }
    },
  },
  getters: {
    showInformations(state) {
      return state.showInformations;
    },
  },
};
