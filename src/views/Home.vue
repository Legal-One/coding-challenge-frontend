<template>
  <div class="home">
    <Table>
      <template v-slot:tableHeader>
        <tr>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details</th>
        </tr>
      </template>
      <template v-slot:tableBody>
        <tr v-for="agentLog in agentLogs" :key="agentLog.identifier">
          <td><router-link :to="{ name: 'Call', params: { number: agentLog.number }}"> {{agentLog.agent.firstName}} {{agentLog.agent.lastName}} </router-link></td>
          <td>{{agentLog.callCount}} {{agentLog.callCount > 1 ? 'calls' : 'call'}}</td>
          <td><router-link :to="{ name: 'Agent', params: { id: agentLog.agentIdentifier }}"> {{agentLog.agent.firstName}} {{agentLog.agent.lastName}} </router-link>/ {{$date(agentLog.dateTime).format('LT')}}</td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue";

export default {
  name: "Home",
  components: {
    Table
  },

  data() {
    return {
      agentLogs: []
    }
  },

  async created() {
   this.agentLogs = await this.fetchLogAgent();
  },

  methods: {
    async fetchLogAgent() {
      const [logResponse, agentResponse] = await Promise.all([fetch('/api/logs'), fetch('/api/agents')]);
      const logs = await logResponse.json();
      const agents = await agentResponse.json()
      const merge = this.mergeAgentsToLogs(logs, agents);

      const frequency = this.frequency(merge)
      const logsAgentsCallCount = this.mergeFrequency(merge, frequency)
      // const callLogs = this.callLogs(logsAgentsCallCount)
      // console.log(callLogs)
      return this.callLogs(logsAgentsCallCount)
    },

    mergeAgentsToLogs(logs, agents) {
      return logs.map(log => {
        const findAgent = agents.find((agent) => log.agentIdentifier === agent.identifier)
        return Object.assign(log, {agent: findAgent})
      })
    },

    frequency(data) {
      return data.map(({ agentIdentifier }) => agentIdentifier)
      .reduce((agentIdentifiers, agentIdentifier) => {
        const count = agentIdentifiers[agentIdentifier] || 0;
        agentIdentifiers[agentIdentifier] = count + 1;
        return agentIdentifiers;
      }, {});
    },

    mergeFrequency(agentLogs, frequency) {
      const frequencyKeys = Object.keys(frequency);
      return agentLogs.map(aglog => {
        const identifier = frequencyKeys.find(fqkey => fqkey === aglog.agentIdentifier);
        const count = frequency[identifier];
        return Object.assign(aglog, {callCount: count})
      })
    },

    sortCallLogs(data) {
      return data.sort(
        (x, y) => {
          const dateA = new Date(x.dateTime);
          const dateB = new Date(y.dateTime);
          return dateB - dateA;
        }
      );
    },

    callLogs(data) {
      const flag = {};
      const unique = [];
      const sorted = this.sortCallLogs(data)
      sorted.forEach(item => {
        if(!flag[item.agentIdentifier]) {
          flag[item.agentIdentifier] = true;
          unique.push(item)
        }
      });
      return unique;
    }
  }
};
</script>
