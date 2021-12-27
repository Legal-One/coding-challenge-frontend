<template>
  <div class="number-details" v-if="!onError.hasError">
    <div class="number-details__title">Call Logs from {{ number }} </div>
    <div v-if="isLoading">
      Loaging
    </div>
    <div class="agent-content__logs" v-if="!isLoading">
      <NumberLogItem v-for="(log, index) in callLogs" :phoneLog="log" :key="index"></NumberLogItem>
    </div>
  </div>
  <div class="error-content" v-else>
    {{ onError.message }}
  </div>
</template>

<script>
import NumberLogItem from '@/components/NumberLogItem.vue';

export default {
  name: 'NumberDetails',
  data() {
    return {
      logs: [],
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
    number: {
      get() {
        const { number } = this.$route.params;
        return number;
      },
    },
    callLogs: {
      get() {
        return this.logs;
      },
      set(value) {
        this.logs = value;
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
    loadCalls() {
      const self = this;
      console.log('env ', process.env.VUE_APP_API_URL);
      const { number } = this.$route.params;
      fetch(`${process.env.VUE_APP_API_URL}logs/${number}`)
        .then((response) => response.json())
        .then(({ status, phoneLogs, message }) => {
          if (status === 200 && phoneLogs.length > 0) {
            self.callLogs = phoneLogs;
          } else {
            this.onError = {
              message: message || 'Number logs could not be found',
              hasError: true,
            };
          }
        });
    },
  },
  created() {
    const { number } = this.$route.params;
    if (!number) {
      this.onError = {
        status: 400,
        message: 'Number is required',
        hasError: true,
      };
    } else {
      this.loadCalls();
    }
  },
  components: {
    NumberLogItem,
  },
};
</script>

<style lang="scss">
  .number-details {
    &__title {
      font-weight: bold;
    }

    &__logs {
      margin-top: 35px;
    }
  }

  .error-content {
    color: red;
    font-weight: bold;
  }
</style>
