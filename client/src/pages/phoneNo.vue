<template>
  <div class="py-5">
    <h2 class="text-2xl font-semibold my-8">{{ id }} Call History</h2>
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
          v-for="data in getTableData"
          :key="data.identifier"
          class="hover:bg-gray-100"
        >
          <td class="px-6 py-4">
            <router-link
              :to="`/agent/${data.agentIdentifier}?name=${data.agentName}`"
            >
              {{ data.agentName }}
            </router-link>
          </td>
          <td>{{ data.callTime }}</td>
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
import ChartView from "@/components/chart.vue";
import Table from "@/components/table.vue";
import { getPhoneNoCallLogs } from "@/services";

export default {
  components: {
    ChartView,
    Table,
  },
  setup() {
    const phoneLogs = ref([]);
    const route = useRoute();
    const id = route.params.id;

    getPhoneNoCallLogs(id).then((data) => {
      phoneLogs.value = data;
    });
    return { phoneLogs, id };
  },
  computed: {
    getTableHeaders() {
      return ["Agent Name", "Call Date Time", "Resolution"];
    },
    getTableData() {
      if (this.phoneLogs) {
        const parseLogs = this.phoneLogs?.map((item) => {
          return {
            ...item,
            callTime: this.getFormatedTime(item.callTime),
          };
        });
        return parseLogs;
      }
      return [];
    },
    getChartData() {
      if (this.phoneLogs) {
        const counter = this.phoneLogs?.reduce((arr, cur) => {
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
