<template>
  <div class="phone-logs-item">
    <div class="phone-logs-item__number">
      {{ phoneLog.number }}
    </div>
    <div class="phone-logs-item__calls">
      {{ phoneLog.logs.length }} calls
    </div>
    <div class="phone-logs-item__agent">
      {{ getLastCallDetails() }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneLogItem',
  props: {
    phoneLog: Object,
  },
  created() {
    console.log(JSON.stringify(this.phoneLog));
  },
  methods: {
    getLastCallDetails() {
      const { logs = [] } = this.phoneLog;
      const { agent, dateTime } = logs.at(-1);
      return `${agent.firstName} ${agent.lastName} / ${dateTime}`;
    },
  },
};
</script>

<style scoped>
  .phone-logs-item {
    display: grid;
    width: 100%;
    height: 70px;
    grid-template-columns: 3fr 1fr 3fr;
  }
</style>
