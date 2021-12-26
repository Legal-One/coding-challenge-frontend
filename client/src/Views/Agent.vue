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
    loadAgentDetails() {
      const self = this;
      console.log('env ', process.env.VUE_APP_API_URL);
      const { id } = this.$route.params;
      fetch(`${process.env.VUE_APP_API_URL}agent/${id}`)
        .then((response) => response.json())
        .then(({ status, agent, logs }) => {
          if (status === 200) {
            self.agent = agent;
            self.agentLogs = logs;
          }
        });
    },
  },
  created() {
    this.loadAgentDetails();
  },
  components: {

  },
};
</script>

<style>

</style>
