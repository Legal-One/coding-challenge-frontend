import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);


//to handle state
const state = {
    agents: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
    getAgents({ commit }) {
        axios.get('http://localhost:8080/agents')
            .then(response => {
                commit('SET_AGENTS', response.data)
        })
    }
}

//to handle mutations
const mutations = {
    SET_AGENTS(state, agents) {
        state.agents = agents
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})