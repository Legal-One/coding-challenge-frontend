<template>
  <div id="app">
    <router-view
      :aggregated_numbers="this.aggregated_numbers"
      :resolutions="this.resolutions"
      v-if="Object.keys(all).length > 0"
    ></router-view>
  </div>
</template>

<script>
//import Home from "./components/Home.vue";
import axios from "axios";

export default {
  name: "App",
  components: {},
  data() {
    return {
      agents: [],
      logs: [],
      resolution: [],
      aggregated_numbers: {}
    };
  },
  created() {
    this.getAgents();
    
  },
  methods: {

    // function programming filter
    getAgentName(id) {
      return this.agents.filter(function (agent) {
        return agent.identifier === id;
      })[0].firstName;
    },

    // function programiing reduct to find latest call object
    findLatestCall(data) {
      var filtered_data = data.reduce((a, b) => {
        return new Date(a.dateTime) > new Date(b.dateTime) ? a : b;
      });
      return {
        number_of_calls: Object.keys(data).length,
        date: filtered_data["dateTime"],
        agent_identifier: filtered_data["agentIdentifier"],
        agent_name: this.getAgentName(filtered_data["agentIdentifier"]),
      };
    },
    groupBy(data, key) {
      return data.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },

    getAgents() {
      axios.get("http://localhost:8080/agents").then((response) => {
        this.agents = response.data;
        // this.getInfo()
      });
      axios.get("http://localhost:8080/logs").then((response) => {
        this.logs = response.data;
      });
      axios.get("http://localhost:8080/resolution").then((response) => {
        this.resolution = response.data;
        this.get_aggregated_data();
      });
    },

    get_aggregated_data() {
      this.aggregated_numbers = this.groupBy(this.logs, "number");
      for (let id in this.aggregated_numbers) {
        this.aggregated_numbers[id] = this.findLatestCall(this.aggregated_numbers[id]);
      }

        console.log(this.aggregated_numbers)
    },
  },
};
</script>

<style>
</style>