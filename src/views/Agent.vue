<template>
  <div class="agent">
     <Table>
      <template v-slot:tableHeader>
        <tr>
          <th>Phone number</th>
          <th>Call date and time</th>
          <th>Resolution</th>
        </tr>
      </template>
      <template v-slot:tableBody>
        <tr v-for="logResolution in logResolutions" :key="logResolution.identifier">
          <td><router-link :to="{ name: 'Call', params: { number: logResolution.number }}"> {{logResolution.number}} </router-link></td>
          <td>{{$date(logResolution.dateTime).format('L LTS')}}</td>
          <td>{{logResolution.resolution}}</td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  components: {
    Table
  },
  
  data() {
    return {
      logResolutions: []
    }
  },

  async created () {
   this.logResolutions = await this.fetchLogResolution(this.$route.params.id);
  },

  methods: {
    async fetchLogResolution (id) {
      const [logResponse, resolutionResponse] = await Promise.all([fetch('/api/logs'), fetch('/api/resolution')]);
      const logs = await logResponse.json();
      const resolutions = await resolutionResponse.json()
      const agentLogs = this.fetchLogsById(id, logs);
      return this.mergeLogsResolution(agentLogs, resolutions);
    },

    fetchLogsById(id, logs) {
      return logs.filter(log => log.agentIdentifier === id)
    },

    mergeLogsResolution(logs, resolutions) {
      return logs.map(log => {
        const findResolution = resolutions.find((resolution) => log.identifier === resolution.identifier)
        return Object.assign(log, {resolution: findResolution.resolution})
      })
    }
  }
}
</script>
