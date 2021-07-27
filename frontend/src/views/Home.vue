<template>
  <div id="root">
    <loader />
    <div v-for='agent in agents' :key='agent.id'>
      {{agent.identifier}}
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";

export default {
  components: { Loader },
  computed: {
    agents() {
      return this.$store.state.agents;
    },
  },
  mounted() {
    this.$store.dispatch("getAgents");
  },
};
</script>

<style scoped>
</style>
