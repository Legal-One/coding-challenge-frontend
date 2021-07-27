<template>
  <div id="root">
    <loader v-if="isLoading" />
    <Table :headings="headings" v-if="!isLoading" class="m-12">
      <tr v-for="item in data" :key="item.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ item["number"] }}
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
import Loader from "../components/Loader.vue";
import Table from "../components/Table.vue";
import { dateAndTime } from "../utils";
import {mapState} from 'vuex'

export default {
  name: "Agent",

  data() {
    return {
      headings: ["Numbers", "Call date and time", "Resolution"],
      identifier: this.$route.params.agentId,
    };
  },
  components: { Loader, Table },
  computed: {
    ...mapState({
      loadStatus: state => state.loadStatus
    }),
    isLoading() {
      return this.loadStatus === true;
    },
    data() {
      if (this.$store.state.logs.length != 0) {
        const agentLogs = this.fetchLogsById(this.identifier, this.logs);
        const result = this.mergeLogsResolution(agentLogs, this.resolutions);
        return result;
      }
      return [];
    },
    logs() {
      return this.$store.state.logs;
    },
    resolutions() {
      return this.$store.state.resolutions;
    },
    agents() {
      return this.$store.state.agents;
    },
  },
  created() {
    this.$store.dispatch("getAllData");
  },
  methods: {
    dateAndTime: dateAndTime,

    fetchLogsById(id, logs) {
      return logs.filter((log) => log.agentIdentifier === id);
    },
    mergeLogsResolution(logs, resolutions) {
      return logs.map((log) => {
        const findResolution = resolutions.find(
          (resolution) => log.identifier === resolution.identifier
        );
        return Object.assign(log, { resolution: findResolution.resolution });
      });
    },
  },
};
</script>

<style>
</style>