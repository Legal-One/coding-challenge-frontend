<template>
  <div id="root">
    <loader v-if="loading_state"/>
    <div v-for="agent in agents" :key="agent.id">
      {{ agent.firstName }}
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue"
// import { getAgentName } from '../utils'

export default {
  data() {
    return {
      loading_state: true
    };
  },
  components: { Loader },
  computed: {
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
  methods: {
    
  }
};
</script>

<style scoped>
</style>
