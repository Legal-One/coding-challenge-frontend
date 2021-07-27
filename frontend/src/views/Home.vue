<template>
  <div id="root">
    <loader v-if="loading_state"/>
    <Table :rows_data = aggreageted_data :headings = headings class="m-12 "/>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue"
import Table from "../components/Table.vue"
import { get_aggregated_data } from '../utils'

export default {
  data() {
    return {
      loading_state: true,
      headings: ["Number", "Number of calls", "Last caller","Last call time"]
    };
  },
  components: { Loader, Table },
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
