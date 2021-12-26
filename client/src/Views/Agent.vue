<template>
  <div class="phone-logs-content">
    <div class="">Agent Details</div>

  </div>
</template>

<script>

export default {
  name: 'Agent',
  data() {
    return {
      agentDetails: {},
      agentLogs: [],
    };
  },
  computed: {
    agent: {
      get() {
        return this.agentDetails;
      },
      set(value) {
        this.agentDetails = value;
      },
    },
  },
  methods: {
  },
  components: {

  },
};
</script>

<style>

</style>
