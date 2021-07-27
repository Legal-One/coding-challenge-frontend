<template>
  <div id="root">
    <loader v-if="loading_state" />
    <Table :headings="headings" v-if="!loading_state" class="m-12">
      <tr v-for="item in aggreageted_data" :key="item.id">
        <router-link :to="`/call/${item.number}`" custom v-slot="{ navigate }">
          <td @click="navigate" @keypress.enter="navigate" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-red-400">
            {{ item.number }}
          </td>
        </router-link> 
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ item.number_of_calls }}
        </td>
        <router-link :to="`/agent/${item.agent_identifier}`" custom v-slot="{ navigate }">
          <td @click="navigate" @keypress.enter="navigate" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-red-400">
            {{ item.agent_name }}
          </td>
        </router-link> 
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ hourAndMinute(item.date) }}
        </td>
      </tr>
    </Table>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import Table from "../components/Table.vue";
import { get_aggregated_data, hourAndMinute } from "../utils";

export default {
  data() {
    return {
      loading_state: false,
      headings: ["Number", "Number of calls", "Last caller", "Last call time"],
    };
  },
  components: { Loader, Table },
  computed: {
    aggreageted_data() {
      if (this.$store.state.logs.length != 0) {
        return get_aggregated_data(this.agents, this.$store.state.logs);
      }
      
      return this.$store.state.agents;
    },
    agents() {
      return this.$store.state.agents;
    },
    logs() {
      return this.$store.state.logs;
    },
  },
  mounted() {
    this.$store.dispatch("getAllData");
  },
  methods: {
    hourAndMinute: hourAndMinute,
  },
};
</script>

<style scoped>
</style>
