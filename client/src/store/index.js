import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agents: [],
    call: null,
    agent: null
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
      axios.get('http://localhost:3000/agents').then(response => {
        console.log(response)
        commit('SET_AGENTS', response.data)
      })
    },

    fetchAgent ({ commit }, id) {
      axios.get(`http://localhost:3000/agent/${id}`).then(response => {
        console.log(response)
        commit('SET_AGENT', response.data)
      })
    },

    fetchCallDetails ({ commit }, number) {
      axios.get(`http://localhost:3000/call/${number}`).then(response => {
        console.log(response)
        commit('SET_CALL_DETAILS', response.data)
      })
    }
  },
  modules: {}
})
