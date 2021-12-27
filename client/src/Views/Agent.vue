<template>
  <div class="agent-content" v-if="!onError.hasError">
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
  <div class="error-content" v-else>
    {{ onError.message }}
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
      error: { hasError: false },
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
    onError: {
      get() {
        return this.error;
      },
      set(value) {
        this.error = value;
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
        .then(({
          status, agent, logs, message,
        }) => {
          if (status === 200) {
            self.agent = agent;
            self.logs = logs;
          } else {
            this.onError = {
              message: message || 'Agent could not be found',
              hasError: true,
            };
          }
        });
    },
  },
  created() {
    const { id } = this.$route.params;
    if (!id) {
      this.onError = {
        status: 404,
        message: 'Agent id is required',
        hasError: true,
      };
    } else {
      this.loadAgentDetails();
    }
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

  .error-content {
    color: red;
    font-weight: bold;
  }
</style>
