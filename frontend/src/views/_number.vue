<template>
  <div class="home">
    <header>{{agent.firstName + ' ' + agent.lastName}}</header>
    <table>
      <tr>
        <th>Agent's name</th>
        <th>Phone Number</th>
        <th>Date & Time</th>
        <th>resolution</th>
      </tr>
      <tr v-for="(log, index) in agent.logs" :key="index">
        <td>{{ agent.firstName + " " + agent.lastName }}</td>
        <td class="user-container">
          <router-link :to="`/call/${log.number}`" class="link">{{
            log.number
          }}</router-link>
        </td>
         <td>{{ new Date(log.dateTime).toLocaleString() }}</td>
        <td>{{ log.resolutions.resolution }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["agent"])
  },
  mounted() {
    this.$store.dispatch("getAgentByNumber", this.$route.params.number);
  },
  methods: {
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
    margin-bottom: 9px;
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
