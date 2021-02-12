import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: "http://localhost:3000/api/v1",
    agents: [],
    agent: {}
  },
  mutations: {
    setAgents(state, params) {
      state.agents = params;
    },
    setAgent(state, param) {
      console.log(param);
      state.agent = param;
    }
  },
  actions: {
    getAgents({ commit, state }) {
      axios
        .get(state.url + "/get-agents")
        .then(result => {
          commit("setAgents", result.data.data);
        })
        .catch(err => {
          console.log(err, err.response);
        });
    },
    getAgent({commit, state}, id) {
      axios
        .get(state.url + "/get-agent/" + id)
        .then(result => {
          commit("setAgent", result.data.data);
        })
        .catch(err => {
          console.log(err, err.response);
        });
    },
    getAgentByNumber({commit, state}, number) {
      axios
        .get(state.url + "/get-agent-by-number/" + number)
        .then(result => {
          commit("setAgent", result.data.data);
        })
        .catch(err => {
          console.log(err, err.response);
        });
    },
  },
});
