<template>
  <div class="number-log-item">
    <div class="number-log-item__agent">
      <router-link :to="`/agent/${agent.identifier}`">
        {{ agent.firstName + " " + agent.lastName}}
      </router-link>
    </div>
    <div class="number-log-item__time">
      {{ phoneLog.dateTime }}
    </div>
    <div class="number-log-item__calls">
      {{ phoneLog.resolution }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberLogItem',
  props: {
    phoneLog: Object,
  },
  data() {
    return {
      agent: {},
      lastCall: {},
    };
  },
  created() {
    console.log(JSON.stringify(this.phoneLog));
    const { agent } = this.phoneLog;
    this.agent = agent;
  },
};
</script>

<style lang="scss">
  .number-log-item {
    display: grid;
    width: 100%;
    align-items: center;
    height: 30px;
    grid-template-columns: 3fr 1fr 3fr;
    background-color: #fff;

    &:hover {
      background-color: #dedede;
    }
  }
</style>
