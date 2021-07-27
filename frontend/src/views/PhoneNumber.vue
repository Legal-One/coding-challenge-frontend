<template>
  <div id="root">
    <loader v-if="loading_state" />
    <Table :headings="headings" v-if="!loading_state" class="m-12">
      <tr v-for="item in data" :key="item.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ item["agent_name"]["firstName"] }} {{ item["agent_name"]["lastName"] }}
        </td>

        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ dateAndTime(item["dateTime"]) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ item["resolution"] }}
        </td>
      </tr>
    </Table>
  </div>
</template>
 
<script>
import Loader from "../components/Loader.vue"
import Table from "../components/Table.vue"
import { dateAndTime } from "../utils";

export default {
  name: "PhoneNumber",

  data() {
    return {
      loading_state: false,
      headings: ["Agents", "Call date and time", "Resolution"],
      phone_number: this.$route.params.number,
    };
  },
  components: { Loader, Table },
  computed: {
    data() {
      let vm = this
      console.log(this.$store.state)
      
      if (this.$store.state.logs.length != 0) {
        var filtered_logs = this.fetchLogsByNumber(vm.phone_number, this.logs)
        return this.mergeLogsAgentsResolutions(filtered_logs, this.agents, this.resolutions)
      }
      return [];
    },
    logs() {
      return this.$store.state.logs
    },
    resolutions() {
      return this.$store.state.resolutions
    },
    agents() {
      return this.$store.state.agents
    },
  },
  created() {
    this.$store.dispatch("getAllData")
  },
  methods:{
    dateAndTime: dateAndTime,
    fetchLogsByNumber(number, logs) {
      return logs.filter(log => log.number === number)
    },
    mergeLogsAgentsResolutions(logs, agents, resolutions) {
      return logs.map(log => {
        const findResolution = resolutions.find((resolution) => log.identifier === resolution.identifier)
        const findAgent = agents.find((agent) => log.agentIdentifier === agent.identifier)
        return Object.assign(log, {resolution: findResolution.resolution, agent_name: {firstName: findAgent.firstName, lastName: findAgent.lastName}})
      })
    }
  }
};
</script>

<style>
</style>