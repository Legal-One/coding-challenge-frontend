import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

let BASE_URL = process.env.BASE_URL

//to handle state
const state = {
    agents: [],
    logs: [],
    resolutions: [],
    loadStatus: true
}

//to handle state
const getters = {}

//to handle actions
const actions = {
    getAllData({commit}) {
        commit('SET_LOAD_STATUS', true);
        Promise.all([
            axios.get(BASE_URL + 'agents').then((response) => response.data),
            axios.get(BASE_URL + 'logs').then((response) => response.data),
            axios.get(BASE_URL + 'resolutions').then((response) => response.data)
        ]).then(([agents, logs, resolutions]) => {
            commit('SET_AGENTS', agents);
            commit('SET_LOGS', logs);
            commit('SET_RESOLUTIONS', resolutions);
            commit('SET_LOAD_STATUS', false);
        });
    },
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
    },
    SET_LOAD_STATUS(state, loadStatus) {
        state.loadStatus = loadStatus
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})