export default {
  namespaced: true,
  state() {
    return {
      showErrorModal: false,
      errorMessage: null,
    };
  },
  mutations: {
    toggleErrorModal(state) {
      state.showErrorModal = !state.showErrorModal;
    },
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
    },
  },
  actions: {
    toggleErrorModal(context) {
      context.commit("toggleErrorModal");
    },
    setErrorMessage(context, payload) {
      context.commit("setErrorMessage", payload);
    },
  },
  getters: {
    getShowErrorModal(state) {
      return state.showErrorModal;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
  },
};
