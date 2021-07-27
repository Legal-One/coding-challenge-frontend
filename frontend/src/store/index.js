import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

let BASE_URL = process.env.BASE_URL

//to handle state
const state = {
    agents: [],
    logs: [],
    resolutions: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
    getAgents({ commit }) {
        axios.get(BASE_URL + 'agents')
            .then(response => {
                commit('SET_AGENTS', response.data)
            })
    },
    getLogs({ commit }) {
        axios.get(BASE_URL + 'logs')
            .then(response => {
                commit('SET_LOGS', response.data)
            })
    },
    getResolutions({ commit }) {
        axios.get(BASE_URL + 'resolutions')
            .then(response => {
                commit('SET_RESOLUTIONS', response.data)
            })
    }
}

//to handle mutations
const mutations = {
    SET_AGENTS(state, agents) {
        state.agents = agents
    },
    SET_LOGS(state, logs) {
        state.logs = logs
    },
    SET_RESOLUTIONS(state, resolutions) {
        state.resolutions = resolutions
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})