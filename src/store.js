import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseUrl = "https://api.telegra.ph/";
export default new Vuex.Store({
  state: {
    accessToken:""
  },
  getters: {
    getBaseUrl(){
      return baseUrl;
    }
  },
  mutations: {

  },
  actions: {

  }
})
