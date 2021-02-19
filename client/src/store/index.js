import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [],
    call: [],
    agent: []
  },

  getters: {
    allAgents: state => state.agents,
    agent: state => state.agent,
    callHistory: state => state.call
  },

  mutations: {
    SET_AGENTS (state, agents) {
      state.agents = agents
    },
    SET_AGENT (state, agent) {
      state.agent = agent
    },
    SET_CALL_DETAILS (state, call) {
      state.call = call
    }
  },

  actions: {
    fetchAgents ({ commit }) {
      axios.get(`${BASE_URL}/agents`).then(response => {
        // console.log(response)
        commit('SET_AGENTS', response.data.data)
      })
    },

    fetchAgent ({ commit }, id) {
      axios.get(`${BASE_URL}/agent/${id}`).then(response => {
        // console.log(response.data.data)
        commit('SET_AGENT', response.data.data)
      })
    },

    fetchCallDetails ({ commit }, number) {
      axios.get(`${BASE_URL}/call/${number}`).then(response => {
        // console.log(response.data.data)
        commit('SET_CALL_DETAILS', response.data.data)
      })
    }
  },
  modules: {}
})
