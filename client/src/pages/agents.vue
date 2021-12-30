<template>
  <div class="py-5">
    <h2 class="text-2xl font-semibold my-8">{{ agentName }} Call's Summary</h2>
    <div class="mx-auto max-w-xl w-full mb-16">
      <template
        v-if="
          getChartData && getChartData.values && getChartData.values.length > 0
        "
      >
        <ChartView
          heading="Call-Logs"
          :data="getChartData.values"
          :labels="getChartData.label"
          type="pie"
          :colors="['#ec4899', '#6366f1', '#FFD833', '#C1FF33']"
        />
      </template>
    </div>
    <Table :headers="getTableHeaders">
      <template #tableRow>
        <tr
          v-for="data in agentLogs"
          :key="data.identifier"
          class="hover:bg-gray-100"
        >
          <td class="px-6 py-4">
            <router-link :to="`/phone-no/${data.phoneNumber}`">
              {{ data.phoneNumber }}
            </router-link>
          </td>
          <td>{{ getFormatedTime(data.callTime) }}</td>
          <td class="capitalize">
            {{ data.resolution }}
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ChartView from "@/components/chat.vue";
import Table from "@/components/table.vue";
import { getAgentCallLogs } from "@/services";

export default {
  components: {
    ChartView,
    Table,
  },
  setup() {
    const agentLogs = ref([]);
    const route = useRoute();
    const id = route.params.id;
    const agentName = route.query.name || "Agent";
    getAgentCallLogs(id).then((data) => {
      agentLogs.value = data;
    });
    return { agentLogs, agentName };
  },
  computed: {
    getTableHeaders() {
      return ["Phone number", "Call date and time", "Resolution"];
    },
    getChartData() {
      if (this.agentLogs) {
        const counter = this.agentLogs?.reduce((arr, cur) => {
          arr[cur.resolution] = ++arr[cur.resolution] || 1;
          return arr;
        }, {});
        return (
          {
            label: Object.keys(counter)?.map(
              (item) => item && item[0].toUpperCase() + item.slice(1)
            ),
            values: Object.values(counter),
          } || null
        );
      }
      return null;
    },
    getFormatedTime() {
      return (arg) => {
        return `${new Date(arg).toLocaleString()}`;
      };
    },
  },
};
</script>