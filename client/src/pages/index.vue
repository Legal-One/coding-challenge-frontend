<template>
  <div class="py-5">
    <h2 class="text-2xl font-semibold my-8">Call Summary</h2>
    <div class="mx-auto max-w-4xl w-full mb-16">
      <ChartView
        heading="Call-Logs"
        :data="getChartData"
        :labels="getChartLabels"
        v-if="getChartData.length && getChartLabels.length"
      />
    </div>
    <Table :headers="getTableHeaders">
      <template #tableRow>
      <tr
        v-for="data in callLogs"
        :key="data.identifier"
        class="hover:bg-gray-100"
      >
        <td class="px-6 py-4">
          <router-link :to="`/phone-no/${data.phoneNumber}`">
            {{ data.phoneNumber }}
          </router-link>
        </td>
        <td>{{ data.callCount }}</td>
        <td>
          <router-link
            :to="`/agent/${data.agentIdentifier}?name=${data.agentName}`"
          >
            {{ data.agentName }}
          </router-link>
          / {{ getTime(data.lastCallTime) }}
        </td>
      </tr>
      </template>
    </Table>
  </div>
</template>

<script>
import { ref } from "vue";
import ChartView from "../components/chat.vue";
import Table from "../components/table.vue";

export default {
  components: {
    ChartView,
    Table,
  },
  setup() {
    const callLogs = ref([]);
    fetch("http://localhost:4000/call-logs")
      .then((response) => response.json())
      .then((data) => {
        callLogs.value = data;
      });
    return { callLogs };
  },
  computed: {
    getTableHeaders () {
      return [ 'Phone number', 'Number of calls', 'Last Call Details']
    },
    getChartLabels() {
      return this.callLogs?.map((item) => item.phoneNumber) || [];
    },
    getChartData() {
      return this.callLogs?.map((item) => item.callCount) || [];
    },
    getTime() {
      return (arg) => {
        const date = new Date(arg);
        return `${date.getHours()}:${date.getMinutes()}`;
      };
    },
  },
};
</script>

