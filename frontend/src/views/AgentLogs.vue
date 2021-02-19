<template>
  <div class="container">
    <h1>{{ agentName }} Logs</h1>
    <Table :headers="tableHeaders" :rows="tableRows" />
  </div>
</template>

<script>
import Table from "../components/Table";
export default {
  data() {
    return {
      tableHeaders: ["Phone Number", "Call and Date Time", "Resolution"],
      tableRows: [],
      agentName: ""
    };
  },
  components: {
    Table
  },
  async created() {
    try {
      const response = await this.axios.get(
        `http://localhost:8080/agent/${this.$route.params.agentID}`
      );
      this.tableRows = response.data.agentLogs;
      this.agentName = response.data.name;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>