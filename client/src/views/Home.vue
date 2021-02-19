<template>
  <div class="home">
    <table id="table">
      <thead>
        <tr>
          <th>Phone number</th>
          <th>Number of calls</th>
          <th>Last call details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(agent, index) in allAgents" :key="index">
          <td>
            <router-link
              :to="{ name: 'Call', params: { number: agent.last.number } }"
              >{{ agent.last.number }}</router-link
            >
          </td>
          <td>
            {{ agent.callCount }} {{ agent.callCount > 1 ? "calls" : "call" }}
          </td>
          <td>
            <router-link
              :to="{
                name: 'Agent',
                params: { id: agent.last.agentIdentifier }
              }"
              >{{ agent.last.agentName }}</router-link
            >
            / {{ formatDuration(agent.last.duration) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      is_fetching: true
    }
  },
  mounted () {
    this.getAgents()
  },
  computed: {
    ...mapGetters(['allAgents'])
  },
  methods: {
    ...mapActions(['fetchAgents']),
    async getAgents () {
      await this.fetchAgents()
    },

    formatDuration (secs) {
      var secNum = parseInt(secs, 10)
      var hours = Math.floor(secNum / 3600)
      var minutes = Math.floor(secNum / 60) % 60
      var seconds = secNum % 60

      return [hours, minutes, seconds]
        .map(v => (v < 10 ? '0' + v : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':')
    }
  }
}
</script>
<style lang="scss">
.home {
  margin: 0 auto;
}
table {
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
  background: #717699;
}
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>
