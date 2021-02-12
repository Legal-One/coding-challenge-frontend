<template>
  <div class="home">
    <header>Call Logs</header>
    <table>
      <tr>
        <th>Agent</th>
        <th>Phone Number</th>
        <th>Number of calls.</th>
        <th>Last call time</th>
      </tr>
      <tr v-for="(agent, index) in agents" :key="index">
        <td class="user-container">
          <div class="avatar">
            <img
              :src="agent.photo"
              :alt="agent.firstName + ' ' + agent.lastName"
            />
          </div>
          <router-link :to="`/agent/${agent.identifier}`" class="link">{{
            agent.firstName + " " + agent.lastName
          }}</router-link>
        </td>
        <td>
          <router-link :to="agent.logs[0]? `/call/${agent.logs[0].number}`: '/'" class="link">{{
            agent.logs[0] ? agent.logs[0].number : "Unavailable" 
          }}</router-link>
        </td>
        <td>{{ agent.logs.length }}</td>
        <td class="call-log">{{ getLatestCall(agent.logs) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["agents"])
  },
  mounted() {
    this.$store.dispatch("getAgents");
  },
  methods: {
    getLatestCall(logs) {
      if (!logs[0]) return "No calls has been made by this agent";
      const date = new Date(Math.max(...logs.map(e => new Date(e.dateTime))));
      const latestDate = new Date(date);
      return latestDate.toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 60%;
  margin: auto;
  margin-top: 25px;
  text-align: left;
  header {
    padding: 9px;
    text-align: left;
    font-weight: bold;
    background: #f1f1f1;
  }
  table {
    width: 100%;
    .user-container {
      display: flex;
      padding: 5px;
      align-items: center;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .link {
    text-decoration: none;
    font-weight: bold;
  }
}
</style>
