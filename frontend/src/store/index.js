// store/index.js
import { createStore } from "vuex";


export default createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true;
      sessionStorage.setItem('loged', true);
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
  actions: {
    logout({ commit }) {
      commit('logout');
      sessionStorage.removeItem('loged');
    },
    // Otras acciones si las tienes
  },
  modules: {},
});
