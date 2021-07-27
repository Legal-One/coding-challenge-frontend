<template>
  <div id="root">
    <loader v-if="loading_state" />
    <Table :headings="headings" class="m-12">
      <tr v-for="item in logs" :key="item.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {{ item }}
        </td>
        
      </tr>
    </Table>
  </div>
</template>
 
<script>
import Loader from "../components/Loader.vue";
import Table from "../components/Table.vue";

export default {
  name: "PhoneNumber",

  data() {
    return {
      loading_state: true,
      headings: ["Number", "Call date and time", "Resolution"],
    };
  },
  components: { Loader, Table },
  computed: {
    logs() {
      return this.$store.state.logs;
    },
    resolutions() {
      return this.$store.state.resolutions;
    },

  },
  mounted() {
    this.$store.dispatch("getLogs");
    this.$store.dispatch("getResolutions")
    this.loading_state = false;
  },
};
</script>

<style>
</style>