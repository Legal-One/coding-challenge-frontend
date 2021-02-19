<template>
  <div class="container">
    <h1>{{ $route.params.number }} Logs</h1>
    <Table :headers="tableHeaders" :rows="tableRows" />
  </div>
</template>

<script>
import Table from "../components/Table";
export default {
  data() {
    return {
      tableHeaders: ["Agent Name", "Call and Date Time", "Resolution"],
      tableRows: []
    };
  },
  components: {
    Table
  },
  async created() {
    try {
      const response = await this.axios.get(
        `http://localhost:8080/call/${this.$route.params.number}`
      );
      this.tableRows = response.data.callLogs;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>