<template>
  <div class="phone-logs-content">
    <div class="">Hello Client</div>
    <phone-log-list v-if="phoneLogList.length > 0" :phoneLogs="phoneLogList"></phone-log-list>
  </div>
</template>

<script>
import PhoneLogs from '@/components/PhoneLogs.vue';

export default {
  name: 'App',
  data() {
    return {
      phoneLogs: [],
    };
  },
  computed: {
    phoneLogList: {
      get() {
        return this.phoneLogs;
      },
      set(value) {
        this.phoneLogs = value;
      },
    },
  },
  methods: {
    loadLogs() {
      const self = this;
      console.log('env ', process.env.VUE_APP_API_URL);
      fetch(`${process.env.VUE_APP_API_URL}logs`)
        .then((response) => response.json())
        .then(({ phoneLogs }) => {
          self.phoneLogList = phoneLogs;
        });
    },
  },
  created() {
    this.loadLogs();
  },
  components: {
    'phone-log-list': PhoneLogs,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
