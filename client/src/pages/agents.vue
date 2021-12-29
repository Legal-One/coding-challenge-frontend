<template>
  <div class="py-5">
    <h2 class="text-2xl font-semibold my-8">Agent Call's Summary</h2>
    <div class="mx-auto max-w-4xl w-full mb-16">
      <template v-if="getChartData && getChartData.values && getChartData.values.length > 0">
        <ChartView
          heading="Call-Logs"
          :data="getChartData.values"
          :labels="getChartData.label"
          type="pie"
          :colors="['#ec4899', '#6366f1', '#FFD833', '#C1FF33']"
        />
      </template>
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
          <th>Call date and time</th>
          <th>Resolution</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="data in agentLogs"
          :key="data.identifier"
          class="hover:bg-gray-100"
        >
          <td class="px-6 py-4">{{ data.phoneNumber }}</td>
          <td>{{ getFormatedTime(data.callTime) }}</td>
          <td class="capitalize">
            {{ data.resolution }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

import ChartView from '../components/chat.vue'
import { ref } from "vue";
import { useRoute } from 'vue-router'

export default {
  components: {
    ChartView
  },
  setup () {
    const agentLogs = ref([]);
    const route = useRoute()
    const id = route.params.id
    fetch(`http://localhost:4000/agent-logs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        agentLogs.value = data;
      });
    return { agentLogs };
  },
  computed: {
    getChartData () {
      if (this.agentLogs) {
        console.log(this.agentLogs)
          const counter = this.agentLogs?.reduce((arr, cur) => {
            arr[cur.resolution] = ++arr[cur.resolution] || 1;
            return arr;
        }, {});
        return {
          label: Object.keys(counter)?.map(item => item && item[0].toUpperCase() + item.slice(1)),
          values: Object.values(counter)
        } || null
      }
      return null
    },
    getFormatedTime () {
      return (arg) => {
        return `${new Date(arg).toLocaleString()}`
      }
    }
  }
}
</script>