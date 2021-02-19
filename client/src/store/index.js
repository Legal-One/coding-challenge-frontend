import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  getters: {},

  mutations: {},

  actions: {
    async fetchAgents ({ commit }) {
      try {
        const response = await axios.get(`${BASE_URL}/agents`)
        return response.data.data
      } catch (err) {
        console.log(err)
      }
    },

    async fetchAgent ({ commit }, id) {
      try {
        const response = await axios.get(`${BASE_URL}/agent/${id}`)
        return response.data.data
      } catch (err) {
        console.log(err)
      }
    },

    async fetchCallDetails ({ commit }, number) {
      try {
        const response = await axios.get(`${BASE_URL}/call/${number}`)
        return response.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {}
})
