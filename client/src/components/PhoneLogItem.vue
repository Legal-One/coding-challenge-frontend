<template>
  <div class="phone-logs-item">
    <div class="phone-logs-item__number">
      <router-link :to="`/call/${phoneLog.number}`">
        {{ phoneLog.number }}
      </router-link>
    </div>
    <div class="phone-logs-item__calls">
      {{ phoneLog.logs.length }} calls
    </div>
    <div class="phone-logs-item__agent">
      <router-link :to="`/agent/${lastAgent.identifier}`">
        {{ lastAgent.firstName + " " + lastAgent.lastName}}
      </router-link>
      / {{ lastCall.dateTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneLogItem',
  props: {
    phoneLog: Object,
  },
  data() {
    return {
      lastAgent: {},
      lastCall: {},
    };
  },
  created() {
    console.log(JSON.stringify(this.phoneLog));
    const { logs = [] } = this.phoneLog;
    this.lastCall = logs.at(-1);
    const { agent = {} } = this.lastCall;
    this.lastAgent = agent;
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

<style lang="scss">
  .phone-logs-item {
    display: grid;
    align-items: center;
    width: 100%;
    height: 30px;
    grid-template-columns: 3fr 1fr 3fr;
    background-color: #fff;

    &:hover {
      background-color: #dedede;
    }
  }
</style>
