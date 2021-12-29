<script>
import { ref } from "vue";
import ChartView from '../components/chat.vue'

export default {
  components: {
    ChartView
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
    getChartLabels () {
      return this.callLogs?.map(item => item.phoneNumber) || []
    },
    getChartData () {
      return this.callLogs?.map(item => item.callCount) || []
    },
    getTime () {
      return arg => {
        const date = new Date(arg)
        return `${date.getHours()}:${date.getMinutes()}`
      }
    }
  }
};
</script>

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
    <table
      class="
        table-auto
        mx-auto
        max-w-4xl
        w-full
        whitespace-nowrap
        rounded-lg
        bg-white
        divide-y divide-gray-300
        overflow-hidden
      "
    >
      <thead>
        <tr
          class="
            bg-gray-900
            text-white
            font-semibold
            text-sm
            uppercase
            px-6
            py-4
          "
        >
          <th class="font-semibold text-sm uppercase px-6 py-4">
            Phone number
          </th>
          <th>Number of calls</th>
          <th>Last call details</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="data in callLogs"
          :key="data.identifier"
          class="hover:bg-gray-100"
        >
          <td class="px-6 py-4">{{ data.phoneNumber }}</td>
          <td>{{ data.callCount }}</td>
          <td>
            <router-link :to="`/agent/${data.agentIdentifier}`">
              {{ data.agentName }} 
            </router-link> 
            / {{ getTime(data.lastCallTime) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
