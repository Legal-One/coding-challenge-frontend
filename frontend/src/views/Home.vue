<template>
  <div id="root">
    <loader v-if="loading_state"/>
    <div v-for="agent in aggreageted_data" :key="agent.id">
      {{ agent.agent_name }}
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue"
import { get_aggregated_data } from '../utils'

export default {
  data() {
    return {
      loading_state: true
    };
  },
  components: { Loader },
  computed: {
    aggreageted_data() {
      if((this.$store.state.logs).length!=0){
        return get_aggregated_data(this.agents, this.$store.state.logs) 
      }
      return this.$store.state.agents
    },
    agents() {
      return this.$store.state.agents
    },
    logs() {
      return this.$store.state.logs
    },
  },
  mounted() {
    this.$store.dispatch("getAgents")
    this.$store.dispatch("getLogs")
    this.loading_state = false
  },
};
</script>

<style scoped>
</style>
