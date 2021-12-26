<template>
  <div class="agent-content">
    <h2 class="">Agent Details</h2>
    <div v-if="isLoading">
      Loaging
    </div>
    <AgentDetails v-if="!isLoading" :agent="agent"></AgentDetails>
    <h2 class="">Agent Logs</h2>
    <div class="agent-content__logs" v-if="!isLoading">
      <AgentLogItem v-for="(log, index) in logs" :phoneLog="log" :key="index"></AgentLogItem>
    </div>
  </div>
</template>

<script>
import AgentDetails from '@/components/AgentDetails.vue';
import AgentLogItem from '@/components/AgentLogItem.vue';

export default {
  name: 'Agent',
  data() {
    return {
      agentDetails: {},
      agentLogs: [],
      loading: false,
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.loading = value;
      },
    },
    agent: {
      get() {
        return this.agentDetails;
      },
      set(value) {
        this.agentDetails = value;
      },
    },
    logs: {
      get() {
        return this.agentLogs;
      },
      set(value) {
        this.agentLogs = value;
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
            self.logs = logs;
          }
        });
    },
  },
  created() {
    this.loadAgentDetails();
  },
  components: {
    AgentDetails,
    AgentLogItem,
  },
};
</script>

<style lang="scss">
  .agent-content {
    &__logs {
      margin-top: 35px;
    }
  }
</style>
