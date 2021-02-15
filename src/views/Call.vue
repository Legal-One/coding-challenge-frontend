<template>
  <div class="call">
    <Table>
      <template v-slot:tableHeader>
        <tr>
          <th>Agent Name</th>
          <th>Call date and time</th>
          <th>Resolution</th>
        </tr>
      </template>
      <template v-slot:tableBody>
        <tr v-for="res in agentLogResolutions" :key="res.identifier">
          <td><router-link :to="{ name: 'Agent', params: { id: res.agentIdentifier }}"> {{res.agent_name.firstName}}  {{res.agent_name.lastName}}</router-link></td>
          <td>{{$date(res.dateTime).format('L LTS')}}</td>
          <td>{{res.resolution}}</td>
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
      agentLogResolutions: []
    }
  },

  async created () {
   this.agentLogResolutions = await this.fetchLogResolution(this.$route.params.number);
  },

  methods: {
    async fetchLogResolution (number) {
      const [logResponse, agentResponse, resolutionResponse] = await Promise.all([fetch('/api/logs'), fetch('/api/agents'), fetch('/api/resolution')]);
      const logs = await logResponse.json();
      const agents = await agentResponse.json();
      const resolutions = await resolutionResponse.json();
      const agentLogs = this.fetchLogsByNumber(number, logs);
      return this.mergeLogsResolutionAgent(agentLogs, agents, resolutions);
    },

    fetchLogsByNumber(number, logs) {
      return logs.filter(log => log.number === number)
    },

    mergeLogsResolutionAgent(logs, agents, resolutions) {
      return logs.map(log => {
        const findResolution = resolutions.find((resolution) => log.identifier === resolution.identifier)
        const findAgent = agents.find((agent) => log.agentIdentifier === agent.identifier)
        return Object.assign(log, {resolution: findResolution.resolution, agent_name: {firstName: findAgent.firstName, lastName: findAgent.lastName}})
      })
    }
  }
}
</script>
